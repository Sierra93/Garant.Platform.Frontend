import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { API_URL } from "src/app/core/core-urls/api-url";
import { ProfileInput } from "src/app/models/profile/input/profile-input";
import { CommonDataService } from "src/app/services/common/common-data.service";

@Component({
    selector: "profile-my-data",
    templateUrl: "./profile-my-data.component.html",
    styleUrls: ["./profile-my-data.component.scss"],
    providers: [ConfirmationService, MessageService]
})

/**
 * Класс модуля профиля пользователя (мои данные).
 */
export class ProfileMyDataModule implements OnInit {
    lastName: string = "";
    firstName: string = "";
    patr: string = "";
    dateYearBirth: Date = new Date();
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
    profileData: any;
    role: string = "";
    countTimeSite: string = "";
    countAd: number = 0;
    // aProfileMenu: any = [];
    isMessageTab: boolean = false;
    bik: number = 0;
    kpp: number = 0;
    availableBanks: any[] = [];
    defaultBankName: string = "";
    corrAccountNumber: number = 0;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private titleService: Title,
        private messageService: MessageService,
        private commonService: CommonDataService) {
    };

    public async ngOnInit() {
        this.titleService.setTitle("Gobizy: Профиль - мои данные");
        await this.getProfileInfoAsync();
        await this.getBankListAsync();
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
            let addressRegister = form.value.registerAddress;
            let bik = form.value.bik;
            let kpp = form.value.kpp;
            let corrAccountNumber = form.value.corrAccountNumber;

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
            profileInput.Bik = bik;
            profileInput.Kpp = kpp;
            profileInput.CorrAccountNumber = corrAccountNumber;

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

    /**
     * Функция получит данные профиля.
     */
    private async getProfileInfoAsync() {
        try {
        await this.http.post(API_URL.apiUrl.concat("/user/get-profile-info"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Данные профиля", response);
                        this.profileData = response;
                        this.firstName = response.firstName ?? "";
                        this.lastName = response.lastName ?? "";
                        this.patr = response.patronymic ?? "";
                        this.email = response.email ?? "";
                        this.dateYearBirth = response.dateBirth ?? "";
                        this.phone = response.phoneNumber ?? "";
                        this.inn = response.inn ?? 0;
                        this.pc = response.pc ?? 0;
                        this.dateGive = response.dateGive ?? "";
                        this.code = response.code ?? "";
                        this.whoGive = response.whoGive ?? "";
                        this.registerAddress = response.registerAddress ?? "";
                        this.serial = response.passportSerial ?? 0;
                        this.number = response.passportNumber ?? 0;
                        this.registerAddress = response.addressRegister ?? "";
                        this.countTimeSite = response.countTimeSite ?? "";
                        this.countAd = response.countAd ?? 0;
                        this.bik = response.bik ?? 0;
                        this.kpp = response.kpp ?? 0;
                        this.corrAccountNumber = response.corrAccountNumber ?? 0;

                        if (this.profileData.values.includes("buy") && this.profileData.values.includes("sell")) {
                            this.role = "Продавца, покупателя";
                        }

                        else if (this.profileData.values == "buy") {
                            this.role = "Продавца";
                        }

                        else if (this.profileData.values == "sell") {
                            this.role = "Покупателя";
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

  /**
   * Функция найдет список банков по поисковому запросу.
   * @param e - Запрос для поиска.
   * @returns - Список найденных банков.
   */
  public async onFilterSearchByBankNameAsync(e: any) {
    try {        
        console.log("onFilterSearchByBankNameAsync", e);

        if (!e.filter) {
            await this.getBankListAsync();
        }
        
        await this.http.get(API_URL.apiUrl.concat(`/control/search-bank-name?searchText=${e.filter}`))
            .subscribe({
                next: (response: any) => {
                    if (e.filter.length) {
                        this.availableBanks = response;
                        console.log("Банки по запросу: ", this.availableBanks);
                    }
                },

                error: (err) => {
                    console.log(err);
                }
            });
    }

    catch (e: any) {
        throw new Error(e);
    }
  };

  /**
   * Функция получит списков банков.
   * @returns - Список банков.
   */
  private async getBankListAsync() {
    try {                        
        await this.http.post(API_URL.apiUrl.concat("/control/get-bank-names-list"), {})
        .subscribe({
            next: (response: any) => {
                this.availableBanks = response;
                console.log("Список банков: ", this.availableBanks);
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
