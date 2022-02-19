import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { forkJoin, Subject } from "rxjs";
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { AdService } from "../../services/ad.service";

@Component({
    selector: "create-ad",
    templateUrl: "./create-ad.component.html",
    styleUrls: ["./create-ad.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAdComponent implements OnInit, OnDestroy {
    public readonly createAdForm = new FormGroup({
        franchise: new FormControl(),
        readyBusiness: new FormControl(),
        categoryName: new FormControl(null, [Validators.required]),
        subCategoryName: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        termsAgreed: new FormControl(true, [Validators.required]),
        wantSell: new FormControl(true)
    });

    public readonly franchiseCategoryList$ = this.adService.franchiseCateogryList$;

    public readonly franchiseSubcategoryList$ = this.adService.franchiseSubcategoryList$;

    public readonly cities$ = this.adService.cities$;

    private readonly unsub$ = new Subject<void>();

    public get canGoAhead(): boolean {
        return this.createAdForm.get('franchise')?.value || this.createAdForm.get('readyBusiness')?.value;
    }

    public get needCity(): boolean {
        return !this.createAdForm.controls.franchise.value;
    }

    constructor(
        private readonly router: Router,
        private readonly adService: AdService
    ) {};

    ngOnInit(): void {
        forkJoin([
            this.adService.loadCities(),
            this.adService.loadFranchiseCategories()
        ]).subscribe();

        this.createAdForm.controls.readyBusiness.valueChanges.pipe(
            tap(value => {
                if (value) {
                    this.createAdForm.controls.franchise.setValue(false, { emitEvent: false });
                    this.createAdForm.controls.city.setValidators([Validators.required]);
                    this.createAdForm.updateValueAndValidity();
                }
            }),
            takeUntil(this.unsub$)
        ).subscribe();

        this.createAdForm.controls.franchise.valueChanges.pipe(
            tap(value => {
                if (value) {
                    this.createAdForm.controls.readyBusiness.setValue(false, { emitEvent: false });
                    this.createAdForm.controls.city.setValue(null, { emitEvent: false });
                    this.createAdForm.controls.city.setErrors(null);
                    this.createAdForm.controls.city.clearValidators();
                    this.createAdForm.updateValueAndValidity();
                }
            }),
            takeUntil(this.unsub$)
        ).subscribe();

      this.createAdForm.controls.categoryName.valueChanges.pipe(
        switchMap(category => this.adService.loadFranchiseSubcategories(category)),
        takeUntil(this.unsub$)
      ).subscribe();
    };

    onSubmit(): void {
        const {
            categoryName,
            subCategoryName,
            franchise,
            readyBusiness,
            city
        } = this.createAdForm.value;

        if (franchise) {
            this.router.navigate(['franchise', 'create'], {
                queryParams: {
                    category: categoryName.categoryName,
                    subCategory: subCategoryName.subCategoryName
                }
            });
        }

        if (readyBusiness) {
            this.router.navigate(['business', 'create'], {
                queryParams: {
                    category: categoryName.categoryName,
                    subCategory: subCategoryName.subCategoryName,
                    city: city.businessCityName
                }
            });
        }
    };

    ngOnDestroy(): void {
        this.unsub$.next();
    }
}
