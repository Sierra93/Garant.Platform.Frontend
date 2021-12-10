import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { API_URL } from "src/app/core/core-urls/api-url";
import { DealInput } from "src/app/models/garant/input/deal-input";
import { GarantInitInput } from "src/app/models/garant/input/garant-init-input";
import { CommonDataService } from "src/app/services/common/common-data.service";
import { GarantService } from "src/app/services/garant/garant.service";

@Component({
    selector: "garant-init",
    templateUrl: "./garant-init.component.html",
    styleUrls: ["./garant-init.component.scss"]
})

/** 
 * Класс модуля Гаранта (страница инита 1 этап).
 */
export class GarantInitModule implements OnInit {    
    oInitData: any = {};

    constructor(private http: HttpClient, 
        private commonService: CommonDataService,
        private garantService: GarantService) {

    };

    public async ngOnInit() {
        await this.initGarantDataAsync();
    };    

    /**
     * Функция получит данные Гаранта на ините.
     * @returns Данные инита страницы.
     */
    private async initGarantDataAsync() {
        try {           
            await this.garantService.initGarantDataAsync().then((response: any) => {
                this.oInitData = response;
                console.log("garant init data: ", this.oInitData);
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция подтвердит продажу в сделке.
     */
    public async onAcceptDealAsync() {
        try {            
            let dataInput = new DealInput();

            if (this.oInitData !== null && this.oInitData !== undefined) {
                dataInput.DealItemId = this.oInitData.itemDealId;
                dataInput.OrderType = this.oInitData.itemDealType;
            }            

            await this.http.post(API_URL.apiUrl.concat("/garant/accept-deal"), dataInput)
                .subscribe({
                    next: (response: any) => {
                        console.log(response);
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

    /**
     * Функция перейдет к согласованию этапов (2 этап сдалки).
     */
     public async onRouteReviewIterations() {
        // try {            
        //     await this.http.post(API_URL.apiUrl.concat("/garant/accept-deal"), garantInput)
        //         .subscribe({
        //             next: (response: any) => {
        //                 this.oInitData = response;
        //             },

        //             error: (err) => {
        //                 this.commonService.routeToStart(err);
        //                 throw new Error(err);
        //             }
        //         });
        // }

        // catch (e: any) {
        //     throw new Error(e);
        // }
    };
}