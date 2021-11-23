import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "profile-dialog-messages",
    templateUrl: "./profile-dialog-messages.component.html",
    styleUrls: ["./profile-dialog-messages.component.scss"],
    providers: [ConfirmationService, MessageService]
})

/** 
 * Класс модуля профиля пользователя (сообщения диалога).
 */
export class ProfileDialogMessagesModule implements OnInit {        
    aMessages: any = [];
    transitionId: number = 0;
    typeItem: string = "";
    otherId: string = "";
    fio: string = "";
    dateStartDialog: string = "";
    message: string = "";
    referenceId: number = 0;

    constructor(private route: ActivatedRoute, 
        private router: Router, 
        private http: HttpClient, 
        private titleService: Title,
        private messageService: MessageService,
        private commonService: CommonDataService) {
        
    };

    public async ngOnInit() {
        await this.getTransitionAsync();
        await this.getDialogMessagesAsync();
    };    

    private async getDialogMessagesAsync() {
        try {
            let dialogId = 0;

            if (this.transitionId <= 0) {
                dialogId = this.route.snapshot.queryParams.dialogId;
            }

            else {
                dialogId = this.transitionId;
            }

            await this.commonService.getDialogMessagesAsync(dialogId, this.typeItem ?? "", this.otherId ?? "").then((data: any) => {
                console.log("Список сообщений диалога: ", data);                
                this.aMessages = data.messages;
                this.fio = data.fullName;
                this.dateStartDialog = data.dateStartDialog;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    private async getTransitionAsync() {
        try {                    
            await this.commonService.getTransitionAsync().then((data: any) => {
                console.log("Переход получен:", data);
                this.transitionId = data.referenceId;
                this.typeItem = data.transitionType;
                this.otherId = data.otherId;
                this.referenceId = data.referenceId;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    public async onSendMessageAsync() {
        console.log("Сообщение", this.message);

        try {                
            await this.http.post(API_URL.apiUrl.concat("/chat/send-message"), {
                Message: this.message,
                DialogId: this.referenceId
            })
                .subscribe({
                    next: (response: any) => {
                        console.log("Сообщения: ", response.messages);
                        this.aMessages = response.messages;                        
                    },

                    error: (err) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    }
}