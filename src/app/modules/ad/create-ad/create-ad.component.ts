import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "create-ad",
    templateUrl: "./create-ad.component.html",
    styleUrls: ["./create-ad.component.scss"]
})

/** 
 * Класс модуля страницы выбора создания объявления.
 */
export class CreateAdModule implements OnInit {    
    aCategories: any;
    aSubCategories: any;
    aCities: any;
    selectedCategory: any;
    selectedSubCategory: any;
    isSelectGobizy: boolean = false;
    isSelectSell: boolean = false;
    isSelectFranch: boolean = true;
    isSelectBus: boolean = false;
    selectedCityName: any;

    constructor(private http: HttpClient, 
        private commonService: CommonDataService,
        private router: Router) {

    };
    
    public async ngOnInit() {    
        await this.onSelectFracnhiseCheck();
    };

    public onContinue(isSelectFranch: boolean, isSelectBus: boolean, isSelectGobizy: boolean, isSelectSell: boolean) {
        console.log("isSelectFranch", isSelectFranch);
        console.log("isSelectBus", isSelectBus);

        // Если выбрана франшиза.
        if (isSelectFranch) {
            this.router.navigate(["/franchise/create"], { queryParams: { category: this.selectedCategory.categoryName, subCategory: this.selectedSubCategory.subCategoryName } });
        }

        // Если выбран бизнес.
        if (isSelectBus) {
            this.router.navigate(["/business/create"], { queryParams: { category: this.selectedCategory.categoryName, subCategory: this.selectedSubCategory.subCategoryName, city: this.selectedCityName.businessCityName } });
        }
    };

    private async GetFranchiseCategoriesListAsync() {
        try {
            await this.commonService.GetFranchiseCategoriesListAsync().then((data: any) => {
                console.log("Список категорий франшиз:", data);
                this.aCategories = data;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };    

    public async onSelectFracnhiseCheck() {
        if (this.isSelectFranch) {
            try {
                await this.commonService.GetFranchiseCategoriesListAsync().then((data: any) => {
                    console.log("Список категорий франшиз:", data);                
                    this.aCategories = data;
                });

                await this.commonService.GetFranchiseSubCategoriesListAsync().then((data: any) => {
                    console.log("Список подкатегорий франшиз:", data);                
                    this.aSubCategories = data;
                });
            }
    
            catch (e: any) {
                throw new Error(e);
            }
        }

        else if (!this.isSelectFranch && this.isSelectBus) {
            this.aCategories = [];
            this.aSubCategories = [];
        }
    };

    public async onSelectBusinessCheck() {
        if (this.isSelectBus) {
            try {
                await this.commonService.GetBusinessCategoriesListAsync().then((data: any) => {
                    console.log("Список категорий бизнеса:", data);                
                    this.aCategories = data;
                });

                await this.commonService.GetBusinessSubCategoriesListAsync().then((data: any) => {
                    console.log("Список подкатегорий бизнеса:", data);                
                    this.aSubCategories = data;
                });

                await this.commonService.GetBusinessCitiesListAsync().then((data: any) => {
                    console.log("Список городов бизнеса:", data);                
                    this.aCities = data;
                });
            }
    
            catch (e: any) {
                throw new Error(e);
            }
        }

        else if (!this.isSelectBus && this.isSelectFranch) {
            this.aCategories = [];
            this.aSubCategories = [];
        }
    };
}