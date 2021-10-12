import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { API_URL } from "src/app/core/core-urls/api-url";
import { FranchiseInput } from "src/app/models/franchise/input/franchise-input";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "catalog-franchise",
    templateUrl: "./catalog-franchise.component.html",
    styleUrls: ["./catalog-franchise.component.scss"]
})

export class CatalogFranchiseModule implements OnInit {
    aPopularFranchises: any[] = [];
    isGarant: boolean = false;
    aCities: any[] = [];
    aBusinessCategories: any[] = [];
    aViewBusiness: any[] = [];
    minPrice: number = 0;
    maxPrice: number = 0;
    view: string = "";
    city: string = "";
    category: string = "";
    selectedCity: string = "";
    selectedCategory: string = "";
    selectedViewBusiness: string = "";
    aFranchises: any[] = [];
    selectedSort: any;
    aSortPrices: any[] = [];

    constructor(private http: HttpClient, private commonService: CommonDataService, private titleService: Title) {
        this.aSortPrices = [
            {
                key: "По убыванию цены"
            },
            {
                key: "По возрастанию цены"
            }
        ];
    };

    public async ngOnInit() {
        this.titleService.setTitle("Gobizy: Каталог франшиз");

        await this.GetPopularAsync();
        await this.GetFranchisesListAsync();
        await this.loadCitiesFranchisesListAsync();
        await this.loadCategoriesFranchisesListAsync();
        await this.loadViewBusinessFranchisesListAsync();
    };   

    /**
     * Функция получит список популярныз франшиз.
     * @returns Список франшиз.
     */
     private async GetPopularAsync() {        
        try {
            await this.commonService.GetPopularAsync().then((data: any) => {
                console.log("Популярные франшизы:", data);
                this.aPopularFranchises = data;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция отфильтрует список франшиз по фильтрам.
     * @param viewCode - Код вида бизнеса.
     * @param categoryCode - Код категории бизнеса.
     * @param cityCode - Город бизнеса. 
     * @param minPrice - Цена от.
     * @param maxPrice - Цена до.
     */
     public async onFilterFranchisesAsync(form: NgForm) {                
        try {
            let filterInput = new FranchiseInput();
            filterInput.viewCode = form.value.view.viewCode;
            filterInput.cityCode = form.value.city.cityCode;
            filterInput.categoryCode = form.value.category.categoryCode;
            filterInput.minPrice = form.value.minPrice;
            filterInput.maxPrice = form.value.maxPrice;

            await this.http.post(API_URL.apiUrl.concat("/main/filter"), filterInput)
                .subscribe({
                    next: (response: any) => {
                        console.log("Отфильтрованный список франшиз:", response);
                        this.aFranchises = response;
                    },

                    error: (err) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };  

    /**
     * Функция получит список франшиз.
     */
    private async GetFranchisesListAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/franchise/catalog-franchise"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Список франшиз:", response);
                        this.aFranchises = response;
                    },

                    error: (err) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * TODO: Вынести в общий сервис.
     * Функция получит список городов франшиз.
     */
     private async loadCitiesFranchisesListAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/main/cities-list"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Список городов:", response);
                        this.aCities = response;
                    },

                    error: (err) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

     /**
      * TODO: Вынести в общий сервис.
     * Функция получит список категорий бизнеса.
     */
    private async loadCategoriesFranchisesListAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/main/business-categories-list"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Список категорий бизнеса:", response);
                        this.aBusinessCategories = response;
                    },

                    error: (err) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * TODO: Вынести в общий сервис.
     * Функция получит список видов бизнеса.
     */
    private async loadViewBusinessFranchisesListAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/main/business-list"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Список видов бизнеса:", response);
                        this.aViewBusiness = response;
                    },

                    error: (err) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };    
}