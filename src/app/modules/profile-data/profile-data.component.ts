import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "src/app/core/core-urls/api-url";
import { RegisterInput } from "src/app/models/register/input/register-input";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
    selector: "profile-data",
    templateUrl: "./profile-data.component.html",
    styleUrls: ["./profile-data.component.scss"],
    providers: [ConfirmationService, MessageService]
})

/** 
 * Класс модуля профиля пользователя.
 */
export class ProfileDataModule implements OnInit {
    firstName: string = "";
    city: string = "";
    lastName: string = "";
    email: string = "";
    pass: string = "";
    selectedValues: any[] = [];

    constructor(private titleService: Title,
        private http: HttpClient,
        private messageService: MessageService) {

    };

    public ngOnInit() {
        // TODO: переделать на получение заголовка с бэка.
        this.titleService.setTitle("Gobizy: Заполнение информации о себе");
    };

    public onChangeDataValue() {
        console.log("selectedValues",this.selectedValues);
    };

    /**
     * Функция завершит регистрацию.
     */
    public async onSaveRegisterAsync(form: NgForm) {
        console.log("onSaveRegisterAsync", form);

        try {
            let regInput = new RegisterInput();
            regInput.firstName = form.value.firstName;
            regInput.lastName = form.value.lastName;
            regInput.city = form.value.city;
            regInput.password = form.value.pass;
            regInput.email = form.value.email;
            regInput.values = this.selectedValues.join();

            await this.http.post(API_URL.apiUrl.concat("/user/save-user-info"), regInput)
                .subscribe({
                    next: (response: any) => {
                        console.log("Данные о себе успешно сохранены", response);                    

                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: 'Данные о себе успешно сохранены'
                        });

                        // setTimeout(() => {
                        //     this.router.navigate(['/task/view'], { queryParams: { id: this.taskId } });
                        // }, 2000);
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