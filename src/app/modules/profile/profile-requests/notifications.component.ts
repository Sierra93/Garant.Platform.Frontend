import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "src/app/core/core-urls/api-url";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
    selector: "notifications",
    templateUrl: "./notifications.component.html",
    styleUrls: ["./notifications.component.scss"],
    providers: [ConfirmationService, MessageService]
})

/** 
 * Класс модуля уведомлений.
 */
export class NotificationsModule implements OnInit {
    aNotifyData: any[] = [];

    constructor(private titleService: Title,
        private http: HttpClient) {

    };

    public async ngOnInit() {
        // TODO: переделать на получение заголовка с бэка.
        this.titleService.setTitle("Gobizy: Мои уведомления");    
        await this.onGetBusinessRequestsAsync();
    };

    /**
     * Функция завершит регистрацию.
     */
    private async onGetBusinessRequestsAsync() {
        console.log("onGetBusinessRequestsAsync");

        try {
            await this.http.get(API_URL.apiUrl.concat("/request/get-requests"))
                .subscribe({
                    next: (response: any) => {
                        console.log("Список заявок: ", response);   
                        this.aNotifyData = response;                 
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