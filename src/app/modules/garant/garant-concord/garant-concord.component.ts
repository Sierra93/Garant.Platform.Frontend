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
    aMessages: any = [];
    dateStartDialog: string = "";
    chatItemName: string = "";
    message: string = "";
    dialogId: number = 0;
    aInvestInclude: any = [];
    aIterationList: any = [];
    chatItemUrl: string = "";
    fio: string = "";

    constructor(private http: HttpClient, 
        private commonService: CommonDataService,
        private garantService: GarantService,
        private router: Router,
        private dataService: DataService) {

    };

    public async ngOnInit() {
        await this.initGarantDataAsync();
        await this.getDialogMessagesAsync();
    };    

    /**
     * Функция получит данные Гаранта на ините.
     * @returns Данные инита страницы.
     */
    private async initGarantDataAsync() {
        try {           
            await this.garantService.initGarantDataAsync(2, true, this.dataService.otherId).then((response: any) => {
                this.oInitData = response;                
                this.aMessages = response.chatData.messages;
                this.dateStartDialog = response.chatData.dateStartDialog;
                this.chatItemName = this.oInitData.itemTitle;
                this.dialogId = response.chatData.dialogId;
                this.aInvestInclude = JSON.parse(response.investInclude);

                console.log("garant init data stage 2: ", this.oInitData);
                console.log("aInvestInclude: ", this.aInvestInclude);
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

    // TODO: Вынести в общий сервис сообщений, как только он будет создан.
    public async onSendMessageAsync() {
        console.log("Сообщение", this.message);

        try {                
            await this.http.post(API_URL.apiUrl.concat("/chat/send-message"), {
                Message: this.message,
                DialogId: this.dialogId
            })
                .subscribe({
                    next: (response: any) => {
                        console.log("Сообщения: ", response.messages);
                        this.aMessages = response.messages; 
                        this.dataService.dialogId = response.dialogId;      
                        this.message = "";                 
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

    public async onRouteGarant4Async(dealItemId: number, type: string, userId: string) {
        await this.commonService.setTransitionAsync(dealItemId, type, userId, type).then((data: any) => {
            console.log("Переход записан:", data);
        });

        this.router.navigate(["/garant/garant-accept-payment"], { queryParams: { stage: 4 } });
    };

    private async getDialogMessagesAsync() {
        try {           
            await this.commonService.getDialogMessagesAsync(this.dialogId, "", "").then((data: any) => {
                console.log("Список сообщений диалога: ", data);                
                this.aMessages = data.messages;
                this.fio = data.fullName;
                this.dateStartDialog = data.dateStartDialog;
                // this.chatItemName = data.chatItemName;
                this.dialogId = data.dialogId;
                this.chatItemUrl = data.url;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };
}