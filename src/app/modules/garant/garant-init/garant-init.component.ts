import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { DealInput } from "src/app/models/garant/input/deal-input";
import { CommonDataService } from "src/app/services/common/common-data.service";
import { DataService } from "src/app/services/common/data-service";
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
    isCheckDeal: boolean = false;

    constructor(private http: HttpClient, 
        private commonService: CommonDataService,
        private garantService: GarantService,
        private router: Router,
        private dataService: DataService) {

    };

    public async ngOnInit() {
        await this.initGarantDataAsync();
        await this.checkDealAsync();
    };    

    /**
     * Функция получит данные Гаранта на ините.
     * @returns Данные инита страницы.
     */
    private async initGarantDataAsync() {
        try {           
            await this.garantService.initGarantDataAsync(1, false, this.oInitData.otherId).then((response: any) => {
                this.oInitData = response;
                console.log("garant init data stage 1: ", this.oInitData);
                this.dataService.otherId = this.oInitData.otherId;
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
     * Функция перейдет к согласованию этапов сделки (2 этап сделки).
     */
     public async onRouteReviewIterationsAsync(itemDealId: number, type: string, userId: string) {
        await this.commonService.setTransitionAsync(itemDealId, type, userId, type).then((data: any) => {
            console.log("Переход записан:", data);
        });

        this.router.navigate(["/garant/garant-concord"], { queryParams: { stage: '2' } });
    };

    /**
     * Функция проверит существование сделки.
     * @returns - Статус проверки.
     */
    private async checkDealAsync() {
        try {            
            let dataInput = new DealInput();

            if (this.oInitData !== null && this.oInitData !== undefined) {
                dataInput.DealItemId = this.oInitData.itemDealId;
                dataInput.OrderType = this.oInitData.itemDealType;
            }            

            await this.http.post(API_URL.apiUrl.concat("/garant/check-deal"), dataInput)
                .subscribe({
                    next: (response: any) => {
                        console.log("Проверка сделки: ", response);
                        this.isCheckDeal = response;
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
}