import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "src/app/core/core-urls/api-url";
import { ConfirmationService, MessageService } from "primeng/api";
import { CommonDataService } from "src/app/services/common/common-data.service";
import { Router } from "@angular/router";

@Component({
    selector: "profile-my-deals",
    templateUrl: "./profile-my-deals.component.html",
    styleUrls: ["./profile-my-deals.component.scss"],
    providers: [ConfirmationService, MessageService]
})

/** 
 * Класс модуля мои сделки.
 */
export class MyDealsModule implements OnInit {
    aDeals: any[] = [];

    constructor(private titleService: Title,
        private http: HttpClient,
        private commonService: CommonDataService,
        private router: Router) {

    };

    public async ngOnInit() {
        // TODO: переделать на получение заголовка с бэка.
        this.titleService.setTitle("Gobizy: Мои сделки");    
        await this.getDealsRequestsAsync();
    };

    /**
     * Функция получит список заявок.
     */
    private async getDealsRequestsAsync() {    
        try {
            await this.http.post(API_URL.apiUrl.concat("/request/get-deals"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Список сделок по заявкам: ", response);   
                        this.aDeals = response;                 
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
     * Функция перейдет в Гарант, если заявка подтверждена.
     */
    public async onRouteDealAsync(requestId: number, type: string) {
        try {
            await this.http.get(API_URL.apiUrl.concat("/request/check-confirm-request?requestId=" + requestId + "&type=" + type))
                .subscribe({
                    next: (response: any) => {
                        console.log("Статус заявки: ", response);                       

                        if (type == "Business") {
                            this.router.navigate(["/garant/garant-init"], {
                                queryParams: {
                                    businessId: requestId,
                                    stage: 1
                                }
                            });
                        }

                        if (type == "Franchise") {
                            this.router.navigate(["/garant/garant-init"], {
                                queryParams: {                                    
                                    franchiseId: requestId,
                                    stage: 1
                                }
                            });
                        }                      
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