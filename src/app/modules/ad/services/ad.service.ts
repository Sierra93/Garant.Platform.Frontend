import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL } from 'src/app/core/core-urls/api-url';

@Injectable()
export class AdService {
    private readonly api = API_URL.apiUrl;

    public readonly franchiseCateogryList$ = new BehaviorSubject<any>(undefined);

    public readonly franchiseSubcategoryList$ = new BehaviorSubject<any>(undefined);

    public readonly cities$ = new BehaviorSubject<any>(undefined);

    constructor(private readonly http: HttpClient) {}

    public loadCities() {
        return this.http.post(this.api + '/business/cities-list', {}).pipe(
            tap(data => this.cities$.next(data))
        );
    }

    public loadFranchiseCategories() {
        return this.http.post(this.api + '/franchise/category-list', {}).pipe(
            tap(data => this.franchiseCateogryList$.next(data))
        );
    }

    public loadFranchiseSubcategories() {
        return this.http.post(this.api + '/franchise/subcategory-list', {}).pipe(
            tap(data => this.franchiseSubcategoryList$.next(data))
        );
    }
}