import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonDataService } from 'src/app/services/common-data.service';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { API_URL } from 'src/app/core/core-urls/api-url';
import { ConfirmEmailInput } from 'src/app/models/register/input/confirm-email-input';
import { FranchiseInput } from 'src/app/models/franchise/input/franchise-input';
import { NgForm } from "@angular/forms";

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})

export class MainPageModule implements OnInit {
	responsiveOptions: any[] = [];
    isGarant: boolean = false;
    // rangeNumber: number = 0;
    rangeValues: number[] = [];
    routeParam: any;
    categoryList1: any[] = [];
    categoryList2: any[] = [];
    categoryList3: any[] = [];
    categoryList4: any[] = [];
    aSlider: any[] = [];
    aDataActions: any[] = [];    
    oSuggestion: any = {};
    aPopularFranchises: any[] = [];
    aAds: any[] = [];
    aBlogs: any[] = [];
    aNews: any[] = [];
    aFranchises: any[] = [];
    oTopAction: any = {};
    selectedCity: string = "";
    selectedCategory: string = "";
    selectedViewBusiness: string = "";
    cities: any[] = [];
    aCities: any[] = [];
    aBusinessCategories: any[] = [];
    aViewBusiness: any[] = [];
    minPrice: number = 0;
    maxPrice: number = 0;
    view: string = "";
    city: string = "";
    category: string = "";

    constructor(private http: HttpClient, 
        private commonService: CommonDataService,
        private titleService: Title,
        private route: ActivatedRoute,
        private router: Router) {
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
    };

    public async ngOnInit() {
         // TODO: переделать на получение заголовка с бэка.
         this.titleService.setTitle("Gobizy: Сервис покупки и продажи франшиз");

        this.routeParam = this.route.snapshot.queryParams;
        console.log("routeParam", this.routeParam);

        if (this.routeParam.code !== "" && this.routeParam.code !== undefined && this.routeParam.code !== null) {
            await this.confirmEmailAsync();
        }

        await this.loadCategoriesListAsync();
        await this.loadSliderLastBuyAsync();
        await this.GetActionsAsync();
        await this.loadSingleSuggestionAsync();
        await this.GetPopularAsync();
        await this.GetAdsAsync();
        await this.GetBlogsAsync();
        await this.GetNewsTopAsync();
        await this.GetQuickFranchisesAsync();
        await this.loadCitiesFranchisesListAsync();
        await this.loadCategoriesFranchisesListAsync();
        await this.loadViewBusinessFranchisesListAsync();
    };    

    /**
     * Функция проверит подтверждение почты.
     */
    private async confirmEmailAsync() {    
        try {
            let confirmInput = new ConfirmEmailInput();
            confirmInput.code = this.routeParam.code;

            await this.http.post(API_URL.apiUrl.concat("/user/confirm-email"), confirmInput)
                .subscribe({
                    next: (response: any) => {
                        console.log("Подтверждение почты:", response);

                        if (response) {
                            this.router.navigate(["/"]);                            
                        }
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
     * Функция получит данные слайдера.
     */
    private async loadSliderLastBuyAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/main/slider-last-buy"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Слайдер:", response);
                        this.aSlider = response;
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
     * Функция получит данные для блока событий.
     */
    private async GetActionsAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/main/actions"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Блок событий:", response);
                        this.aDataActions = response;

                        this.oTopAction = this.aDataActions.filter(el => el.isTop == true)[0];
                        console.log("oTopAction",this.oTopAction);
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
     * Функция получит список последних объявлений.
     * @returns Список объявлений.
     */
     private async GetAdsAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/ad/new"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Последние объявления:", response);
                        this.aAds = response;
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
            await this.http.post(API_URL.apiUrl.concat("/blog/main-news"), {})
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
     * Функция получит список франшиз для области быстрого поиска.
     * @returns Список франшиз.
     */
     private async GetQuickFranchisesAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/franchise/quick-franchises"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Франшизы для быстрого поиска:", response);
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

    /**
     * Функция отфильтрует список франшиз по фильтрам.
     * @param viewCode - Код вида бизнеса.
     * @param categoryCode - Код категории бизнеса.
     * @param cityCode - Город бизнеса. 
     * @param minPrice - Цена от.
     * @param maxPrice - Цена до.
     */
    public async onFilterFranchisesAsync(form: NgForm) {
        console.log("onFilterFranchisesAsync", form);
        
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
}
