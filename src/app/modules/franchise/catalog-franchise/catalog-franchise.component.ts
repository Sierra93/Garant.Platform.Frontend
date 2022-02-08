import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { FilterInput } from "src/app/models/franchise/input/filter-franchise-input";
import { PaginationInput } from "src/app/models/pagination/input/pagination-input";
import { CommonDataService } from "src/app/services/common/common-data.service";

@Component({
    selector: "catalog-franchise",
    templateUrl: "./catalog-franchise.component.html",
    styleUrls: ["./catalog-franchise.component.scss"]
})

/** 
 * Класс модуля каталога франшиз.
 */
export class CatalogFranchiseModule implements OnInit {
    aPopularFranchises: any[] = [];
    isGarant: boolean = false;
    aCities: any[] = [];
    aBusinessCategories: any[] = [];
    aViewBusiness: any[] = [];
    minPrice!: number;
    maxPrice!: number;
    view: string = "";
    city: string = "";
    category: string = "";
    selectedCity: string = "";
    selectedCategory: any;
    selectedViewBusiness: any;
    aFranchises: any[] = [];
    selectedSort: any;
    aSortPrices: any[] = [];
    filterMinPrice!: number;
    filterMaxPrice!: number;
    countTotalPage: number = 0;
    countFranchises!: number;
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
    franchiseId: number = 0;
    routeParam: number;

    constructor(private http: HttpClient, 
        private commonService: CommonDataService, 
        private titleService: Title,
        private router: Router,
        private route: ActivatedRoute) {
        // TODO: Переделать на хранение на бэке.
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

        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];

        this.routeParam = this.route.snapshot.queryParams.franchiseId;
    };

    public async ngOnInit() {
        this.titleService.setTitle("Gobizy: Каталог франшиз");

        await this.GetPopularAsync();
        await this.GetFranchisesListAsync();
        await this.loadCitiesFranchisesListAsync();
        await this.loadCategoriesFranchisesListAsync();
        await this.loadViewBusinessFranchisesListAsync();
        await this.loadPaginationInitAsync();
        await this.GetActionsAsync();
        await this.GetBlogsAsync();
        await this.GetNewsTopAsync();
        await this.loadCategoriesListAsync();
        await this.loadSingleSuggestionAsync();
        await this.GetNewFranchisesListAsync();
        await this.GetReviewsFranchisesAsync();
    };   

    /**
     * Функция получит список популярныз франшиз.
     * @returns Список франшиз.
     */
     private async GetPopularAsync() {        
        try {
            await this.commonService.getPopularAsync().then((data: any) => {
                console.log("Популярные франшизы:", data);
                this.aPopularFranchises = data;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
      * TODO: вынести в общий сервис.
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

    public async onPaginationChangeAsync(event: any) {
        let paginationData = new PaginationInput();
        paginationData.PageNumber = event.page + 1;
        paginationData.CountRows = event.rows;

        try {
            await this.http.post(API_URL.apiUrl.concat("/pagination/catalog-franchise"), paginationData)
            .subscribe({
                next: (response: any) => {
                    console.log("get data pagination", response);
                    this.countFranchises = response.countAll;
                    // this.aFranchises = response.results;
                    // this.router.navigate(['/auction'], {
                    //     queryParams: {
                    //         page: paginationData.PageNumber,
                    //         rows: paginationData.CountRows
                    //     }
                    // });
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

    private async loadPaginationInitAsync() {
        let paginationData = new PaginationInput();

        // TODO: доработать на динамическое получение из роута или как-нибудь еще, чтобы помнить, что выбирал пользователь.
        paginationData.PageNumber = 1;

        try {
            await this.http.post(API_URL.apiUrl.concat("/pagination/init-catalog-franchise"), paginationData)
            .subscribe({
                next: (response: any) => {
                    console.log("pagination init", response);
                    this.countFranchises = response.countAll;
                    // this.aFranchises = response.results;
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

    public async onChangeSortPrice() {
        console.log("onChangeSortPrice", this.selectedSort);
    };

    /**
     * Функция фильтрует франшизы по параметрам.
     * @returns - Отфильтрованный список франшиз.
     */
    public async onFilterFranchisesAsync() {
        try {
            let filterInput = new FilterInput();
            filterInput.TypeSortPrice = this.selectedSort.value;
            filterInput.ProfitMinPrice = this.filterMinPrice;
            filterInput.ProfitMaxPrice = this.filterMaxPrice;
            filterInput.ViewCode = this.selectedViewBusiness.viewCode;
            filterInput.CategoryCode = this.selectedCategory.categoryCode;
            filterInput.MinPriceInvest = this.minPrice;
            filterInput.MaxPriceInvest = this.maxPrice;
            filterInput.IsGarant = this.isGarant;

            await this.http.post(API_URL.apiUrl.concat("/franchise/filter-franchises"), filterInput)
            .subscribe({
                next: (response: any) => {
                    console.log("Франшизы после фильтрации:", response);                    
                    this.aFranchises = response;
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
     * Функция получит данные для блока событий.
     */
     private async GetActionsAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/main/actions"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Блок событий:", response);
                        this.aDataActions = response.filter((el: any) => el.isTop == false);

                        // this.oTopAction = this.aDataActions.filter(el => el.isTop == true)[0];
                        // console.log("oTopAction",this.oTopAction);
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
     * Функция получит список блогов.
     * @returns Список блогов.
     */
     private async GetBlogsAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/blog/main-blogs"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Список блогов:", response);
                        this.aBlogs = response;
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
     * Функция получит список проплаченных новостей.
     * @returns Список новостей.
     */
     private async GetNewsTopAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/blog/get-news"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Список новостей:", response);
                        this.aNews = response;
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

    /**
     * Функция получит список новых франшиз.
     * @returns Список франшиз.
     */
    private async GetNewFranchisesListAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/franchise/new-franchise"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Список новых франшиз:", response);
                        this.aNewFranchises = response;
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

    private async GetReviewsFranchisesAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/franchise/review"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Отзывы:", response);
                        this.aReviewsFranchises = response;
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

    /**
     * Функция перейдет к просмотру карточки франшизы.
     */
    public async routeViewFranchiseCardAsync(franchiseId: number) {
        await this.setTransitionAsync(franchiseId);    
        this.router.navigate(["/franchise/view"], { queryParams: { franchiseId: franchiseId } });
    };
}