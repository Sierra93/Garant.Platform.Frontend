import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { DealInput } from "src/app/models/garant/input/deal-input";
import { CommonDataService } from "src/app/services/common/common-data.service";
import { DataService } from "src/app/services/common/data-service";
import { GarantService } from "src/app/services/garant/garant.service";

@Component({
    selector: "garant-concord",
    templateUrl: "./garant-concord.component.html",
    styleUrls: ["./garant-concord.component.scss"]
})

/** 
 * Класс модуля Гаранта (страница согласования этапов сделки 2 этап).
 */
export class GarantConcordModule implements OnInit {    
    oInitData: any = {};

    constructor(private http: HttpClient, 
        private commonService: CommonDataService,
        private garantService: GarantService,
        private router: Router,
        private dataService: DataService) {

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
            await this.garantService.initGarantDataAsync(2, true, this.dataService.otherId).then((response: any) => {
                this.oInitData = response;
                console.log("garant init data stage 2: ", this.oInitData);
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
}