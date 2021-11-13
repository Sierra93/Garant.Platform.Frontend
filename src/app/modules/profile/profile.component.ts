import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { API_URL } from "src/app/core/core-urls/api-url";
import { ProfileInput } from "src/app/models/profile/input/profile-input";

@Component({
    selector: "profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
    providers: [ConfirmationService, MessageService]
})

/** 
 * Класс модуля профиля пользователя.
 */
export class ProfileModule implements OnInit {    
    lastName: string = "";
    firstName: string = "";
    patr: string = "";
    dateYearBirth: string = "";
    email: string = "";
    phone: string = "";
    inn: number = 0;
    pc: number = 0;
    serial: number = 0;
    number: number = 0;
    dateGive: string = "";
    whoGive: string = "";
    code: string = "";
    registerAddress: string = "";
    documentFile: any;

    constructor(private route: ActivatedRoute, 
        private router: Router, 
        private http: HttpClient, 
        private titleService: Title,
        private messageService: MessageService) {
        
    };

    public ngOnInit() {
        
    };  

    /**
     * Функция сохранит данные формы профиля.
     * @param form - Форма.
     * @param type - Тип формы.
     * @returns - Сохраненные данные формы.
     */
    public async onSaveProfileFormAsync(form: NgForm, type: string) {
        try {
            let lastName = form.value.lastName;
            let firstName = form.value.firstName;
            let patr = form.value.patr;
            let dateYearBirth = form.value.dateYearBirth;
            let email = form.value.email;
            let phone = form.value.phone;
            let inn = form.value.inn;
            let pc = form.value.pc;
            let serialPassport = form.value.serialPassport;
            let numberPassport = form.value.numberPassport;
            let code = form.value.code;
            let dateGive = form.value.dateGive;
            let whoGive = form.value.whoGive;
            let addressRegister = form.value.addressRegister;

            let profileInput = new ProfileInput();
            profileInput.DateBirth = dateYearBirth;
            profileInput.Email = email;
            profileInput.FirstName = firstName;
            profileInput.LastName = lastName;
            profileInput.Patronymic = patr;
            profileInput.PhoneNumber = phone;
            profileInput.TypeForm = type;
            profileInput.Inn = inn;
            profileInput.Pc = pc;
            profileInput.PassportSerial = serialPassport;
            profileInput.PassportNumber = numberPassport;
            profileInput.Code = code;
            profileInput.DateGive = dateGive;
            profileInput.WhoGive = whoGive;
            profileInput.AddressRegister = addressRegister;

            let formData = new FormData();
            formData.append("documentFile", this.documentFile);
            formData.append("userInformationInput", JSON.stringify(profileInput));

            await this.http.post(API_URL.apiUrl.concat("/user/save-profile-info"), formData)
                .subscribe({
                    next: (response: any) => {
                        console.log("Успешно сохранено", response);
                        this.showMessageAfterSuccessSaveProfileInfo();
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

     /**
     * Функция добавит файл документа.
     */
      public uploadDocumentAsync(event: any) {
        console.log("uploadDocumentAsync");
        this.documentFile = event.target.files[0];
    };

     /**
     * Функция покажет сообщение об успешном сохранении .
     */
      private showMessageAfterSuccessSaveProfileInfo() {
        this.messageService.add({
            severity: 'success',
            summary: 'Успешно!',
            detail: 'Успешно сохранено'
        });
    };
}