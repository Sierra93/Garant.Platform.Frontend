import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonDataService } from 'src/app/services/common-data.service';
import { Title } from "@angular/platform-browser";
import { ProductService } from 'src/app/services/productservice';

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

    constructor(private http: HttpClient, 
        private commonService: CommonDataService,
        private titleService: Title,
        private productService: ProductService) {
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
    }

    public async ngOnInit() {
         // TODO: переделать на получение заголовка с бэка.
         this.titleService.setTitle("Gobizy - сервис покупки и продажи франшиз");

         this.productService.getProductsSmall().then(products => {
			this.products = products;
		});
    };    
}
