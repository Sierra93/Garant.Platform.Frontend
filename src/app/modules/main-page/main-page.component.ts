import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonDataService } from 'src/app/services/common-data.service';
import { Title } from "@angular/platform-browser";
import { ProductService } from 'src/app/services/productservice';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URL } from 'src/app/core/core-urls/api-url';
import { ConfirmEmailInput } from 'src/app/models/register/input/confirm-email-input';

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageModule implements OnInit {
    products: any[] = [];
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

    constructor(private http: HttpClient, 
        private commonService: CommonDataService,
        private titleService: Title,
        private productService: ProductService,
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

         this.productService.getProductsSmall().then(products => {
			this.products = products;
		});

        this.routeParam = this.route.snapshot.queryParams;
        console.log("routeParam", this.routeParam);

        if (this.routeParam.code !== "" && this.routeParam.code !== undefined && this.routeParam.code !== null) {
            await this.confirmEmailAsync();
        }

        await this.loadCategoriesListAsync();
        await this.loadSliderLastBuyAsync();
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
}
