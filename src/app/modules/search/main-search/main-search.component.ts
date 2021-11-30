import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { FilterInput } from "src/app/models/franchise/input/filter-franchise-input";
import { SearchInput } from "src/app/models/search/input/search-input";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "main-search",
    templateUrl: "./main-search.component.html",
    styleUrls: ["./main-search.component.scss"]
})

/** 
 * Класс модуля поиска.
 */
export class MainSearchModule implements OnInit {
    searchType: string;
    searchText: string;
    aFranchises: any = [];
    aBusinesses: any = [];
    countTotalPage: number = 0;
    filterMinPrice: number = 0;
    filterMaxPrice: number = 0;
    selectedSort: any;
    isGarant: boolean = false;
    aSortPrices: any[] = [];
    isFranchise: boolean = false;
    isBusiness: boolean = false;
    aBusinessList: any = [];
    minPrice: number = 0;
    maxPrice: number = 0;
    selectedCity: string = "";
    aCities: any[] = [];
    selectedCategory: string = "";
    selectedViewBusiness: string = "";
    aBusinessCategories: any = [];
    aBlogs: any[] = [];
    aNews: any[] = [];
    categoryList1: any[] = [];
    categoryList2: any[] = [];
    categoryList3: any[] = [];
    categoryList4: any[] = [];
    aDataActions: any[] = [];
    oTopAction: any = {};
    oSuggestion: any = {};
    aNewFranchises: any[] = [];
    responsiveOptions: any[] = [];
    aReviewsFranchises: any[] = [];
    aResultSearch: any = [];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private titleService: Title,
        private commonService: CommonDataService) {
        this.searchType = this.route.snapshot.queryParams.searchType;
        this.searchText = this.route.snapshot.queryParams.searchText;

        if (this.searchType == "franchise") {
            this.titleService.setTitle("Gobizy: Страница поиска по франшизам");
            this.isFranchise = true;
        }        
        
        if (this.searchType == "business") {
            this.titleService.setTitle("Gobizy: Страница поиска по бизнесу");
            this.isBusiness = true;
        }   

        this.aSortPrices = [
            {
                name: "По убыванию цены",
                value: "Desc"
            },
            {
                name: "По возрастанию цены",
                value: "Asc"
            }
        ];

        console.log("searchType", this.searchType);
        console.log("searchText", this.searchText);
    };

    public async ngOnInit() {
        await this.onSearchAsync();
        await this.GetFranchisesListAsync();
        await this.loadCategoriesListAsync();
        await this.loadSingleSuggestionAsync();
    };

    /**
     * Функция найдет по параметрам данные.
     * @param searchText Текст поиска.
     */
    private async onSearchAsync() {
        try {
            let searchInput = new SearchInput();      
            searchInput.SearchType = this.searchType;                     
            searchInput.SearchText = this.searchText;

            await this.http.post(API_URL.apiUrl.concat("/search/search-data"), searchInput)
                .subscribe({
                    next: (response: any) => {                                       
                        if (this.searchType == "franchise") {
                            this.aResultSearch = response;

                            // Возьмет 1 изображение.
                            this.aFranchises.forEach((item: any) => {
                                if (item.url != null && item.url.includes(",")) {
                                    item.url = item.url.split(",")[0];
                                }                            
                            });
                        }        
                        
                        if (this.searchType == "business") {
                            this.aResultSearch = response;

                            // Возьмет 1 изображение.
                            this.aBusinesses.forEach((item: any) => {
                                if (item.url != null && item.url.includes(",")) {
                                    item.url = item.url.split(",")[0];
                                }                                      
                            });
                        }   

                        console.log("search data: ", response);
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

    public async FilterFranchisesAsync() {
        try {
            let filterInput = new FilterInput();
            filterInput.TypeSortPrice = this.selectedSort.value;
            filterInput.ProfitMinPrice = this.filterMinPrice.toString();
            filterInput.ProfitMaxPrice = this.filterMaxPrice.toString();

            await this.http.post(API_URL.apiUrl.concat("/franchise/filter-franchises"), filterInput)
            .subscribe({
                next: (response: any) => {
                    console.log("Франшизы после фильтрации:", response);                    
                    // this.aFranchises = response;
                },

                error: (err) => {
                    this.commonService.routeToStart(err);
                    throw new Error(err);
                }
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    }; 

    public async onClearFilters() {
        await this.GetFranchisesListAsync();
    };

    /**
     * Функция получит список франшиз.
     */
     private async GetFranchisesListAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/franchise/catalog-franchise"), {})
                .subscribe({
                    next: (response: any) => {                        
                        this.aFranchises = response;
                        this.countTotalPage = response.length;
                        console.log("Список франшиз:", response);
                        console.log("Кол-во франшиз:", this.countTotalPage);
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

    public async onChangeSortPrice() {
        console.log("onChangeSortPrice", this.selectedSort);
    };

    /**
     * Функция перейдет к просмотру карточки франшизы.
     */
     public async routeViewFranchiseCardAsync(franchiseId: number) {
        await this.setTransitionAsync(franchiseId);    
        this.router.navigate(["/franchise/view"], { queryParams: { franchiseId: franchiseId } });
    };

    /**
     * Функция запишет переход.
     */
     private async setTransitionAsync(franchiseId: number) {
        try {
            await this.commonService.setTransitionAsync(franchiseId, "Franchise", "", "").then((data: any) => {
                console.log("Переход записан:", data);
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    public async onRouteFranchiseChatAsync(franchiseId: number, type: string, userId: string) {
        await this.commonService.setTransitionAsync(franchiseId, type, userId, type).then((data: any) => {
            console.log("Переход записан:", data);
        });

        // this.router.navigate(["/profile/chat/dialogs/dialog"], { queryParams: { dialogId: dialogId } });
        this.router.navigate(["/profile/chat/dialogs/dialog"]);
    };

    /**
     * Функция получит список категорий.
     * @returns Список категорий.
     */
     private async loadCategoriesListAsync() {
        try {
            await this.commonService.loadCategoriesListAsync().then((data: any) => {
                this.categoryList1 = data.resultCol1;
                this.categoryList2 = data.resultCol2;
                this.categoryList3 = data.resultCol3;
                this.categoryList4 = data.resultCol4;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит одно предложение с флагом IsSingle.
     * @returns данные предложения.
     */
     private async loadSingleSuggestionAsync() {
        try {
            await this.commonService.loadSingleSuggestionAsync().then((data: any) => {
                this.oSuggestion = data;            
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };
}