import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { API_URL } from "src/app/core/core-urls/api-url";
import { ProfileInput } from "src/app/models/profile/input/profile-input";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "profile-my-dialogs",
    templateUrl: "./profile-my-dialogs.component.html",
    styleUrls: ["./profile-my-dialogs.component.scss"],
    providers: [ConfirmationService, MessageService]
})

/** 
 * Класс модуля профиля пользователя (мои сообщения).
 */
export class ProfileMyMessagesModule implements OnInit {        
    aDialogs: any = [];

    constructor(private route: ActivatedRoute, 
        private router: Router, 
        private http: HttpClient, 
        private titleService: Title,
        private messageService: MessageService,
        private commonService: CommonDataService) {
        
    };

    public async ngOnInit() {
        await this.getDialogsAsync();
    };    

    private async getDialogsAsync() {
        try {
            await this.commonService.getDialogsAsync().then((data: any) => {
                console.log("Список диалогов:", data);                
                this.aDialogs = data;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит Id диалога, для которого нужно получить сообщения и перейдет на страницу сообщений диалога.
     * @param dialogId Id диалога.
     */
    public async onGetDialogMessageAsync(dialogId: any) {
        console.log("Выбранный диалог: ", dialogId);

        await this.commonService.setTransitionAsync(dialogId, "Chat", "", "").then((data: any) => {
            console.log("Переход записан:", data);
        });

        this.router.navigate(["/profile/chat/dialogs/dialog"], { queryParams: { dialogId: dialogId } });
    };
}