import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CreateUpdateFranchiseInput } from "src/app/models/franchise/input/franchise-create-update-input";
import { CommonDataService } from "src/app/services/common/common-data.service";

@Component({
    selector: "edit-franchise",
    templateUrl: "./edit-franchise.component.html",
    styleUrls: ["./edit-franchise.component.scss"],
    providers: [ConfirmationService, MessageService]
})

/**
 * Класс модуля изменения франшизы.
 */
export class EditFranchiseModule implements OnInit {
    franchiseId: number = 0;
    logoName?: string;
    responsiveOptions: any;
    aNamesFranchisePhotos: any = [];
    aFiles: any[] = [];
    lead?: string;
    generalInvest?: number;
    lumpSumPayment?: number;
    royalty?: number;
    royaltyPack?: number;
    payback?: number;
    profitMonth?: number;
    launchDate?: number;
    priceInvest?: number;
    nameInvest?: string;
    baseDate?: number;
    yearStart?: number;
    dotCount?: number;
    businessCount?: number;
    peculiarity?: string;
    isHidePacks?: boolean;
    packName?: string;
    packDetails?: string;
    packLumpSumPayment?: string;
    isGarant: boolean = false;
    fileLogoFormData?: any;
    franchisePhotos: any;
    fileEducationFormData: any;
    activityDetail?: string;
    featureFranchise?: string;
    defailsFranchise?: string;
    paymentDetails?: string;
    namesIndicators?: string;
    finIndicator1?: string;
    finIndicator2?: string;
    finIndicator3?: string;
    finIndicator4?: string;
    percentFinancial1?: number;
    percentFinancial2?: number;
    percentFinancial3?: number;
    percentFinancial4?: number;
    educationDetails?: string;
    totalInvest?: number;
    videoLink?: string;
    modelFile: any;
    presentFile: any;
    franchiseData: any = {};
    routeParam: any;
    aInvestInclude: any = [];
    aFinIndicators: any[] = [];
    aPacks: any[] = [];
    aFranchisePhotos: any[] = [];
    isHideIndicators: boolean = false;

    constructor(private http: HttpClient,
        private commonService: CommonDataService,
        private route: ActivatedRoute,
        private messageService: MessageService) {
            this.responsiveOptions = [
                {
                    breakpoint: '1024px',
                    numVisible: 5
                },
                {
                    breakpoint: '768px',
                    numVisible: 3
                },
                {
                    breakpoint: '560px',
                    numVisible: 1
                }
            ];

            this.routeParam = this.route.snapshot.queryParams;
    };

    public async ngOnInit() {
        await this.getTransitionAsync();
    };

    private async getTransitionAsync() {
        try {
            let franchiseId = 0;

            if (this.franchiseId <= 0 || this.franchiseId == undefined) {
                franchiseId = this.route.snapshot.queryParams.franchiseId;
            }

            else {
                franchiseId = this.franchiseId;
            }

            await this.commonService.getTransitionAsync(this.routeParam).then((data: any) => {
                console.log("Переход получен:", data);
                this.getViewFranchiseAsync(franchiseId);
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит данные франшизы, которую нужно изменить.
     * @returns - данные франшизы.
     */
     private async getViewFranchiseAsync(franchiseId: number) {
        try {
            console.log("getViewFranchiseAsync");

            await this.http.get(API_URL.apiUrl.concat("/franchise/get-franchise?franchiseId=" + franchiseId))
                .subscribe({
                    next: (response: any) => {
                        console.log("Полученная франшиза:", response);
                        this.franchiseData = response;
                        this.aFranchisePhotos = this.franchiseData.url.split(",");
                        console.log("franchiseData", this.franchiseData);

                        // let checkFinIndicators = JSON.parse(response.finIndicators);

                        // // Если массив индикаторов не пустой.
                        // if (Object.keys(checkFinIndicators[0]).length > 0) {
                        //     this.aFinIndicators = checkFinIndicators;
                        //     this.isHideIndicators = true;
                        // }

                        // let checkPacks = JSON.parse(response.franchisePacks);

                        // // Если массив пакетов не пустой.
                        // if (Object.keys(checkPacks[0]).length > 0) {
                        //     this.aPacks = checkPacks;
                        //     this.isHidePacks = true;
                        // }

                        this.aInvestInclude = JSON.parse(response.investInclude);
                        this.aFinIndicators = JSON.parse(response.finIndicators);
                        this.aPacks = JSON.parse(response.franchisePacks);

                        console.log("aInvestInclude", this.aInvestInclude);
                        console.log("aFinIndicators", this.aFinIndicators);
                        console.log("aPacks", this.aPacks);
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
     * Функция добавит файл лого франшизы.
     */
     public uploadFranchiseLogoAsync(event: any) {
        console.log("uploadFranchiseLogoAsync");
        this.fileLogoFormData = event.target.files[0];
    };

    /**
     * Функция добавит файл обучения.
     */
    public uploadEducationPhotosAsync(event: any) {
        console.log("uploadEducationPhotosAsync");
        this.fileEducationFormData = event.target.files[0];
    };

    /**
     * Функция добавит фото франшизы.
     */
    public uploadFranchisePhotosBeforeSaveAsync(event: any) {
        console.log("uploadFranchisePhotosBeforeSaveAsync");
        this.franchisePhotos = event.target.files[0];
    };

     /**
     * Функция добавит файл фин.модели.
     */
    public uploadFinModelAsync(event: any) {
        console.log("uploadFinModelAsync");
        this.modelFile = event.target.files[0];
    };

    /**
     * Функция добавит файл презентации.
     */
    public uploadPresentAsync(event: any) {
        console.log("uploadPresentAsync");
        this.presentFile = event.target.files[0];
    };

    public async uploadFranchisePhotosAsync(event: any) {
        try {
            let fileList = event.target.files;
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('files', file);

            await this.http.post(API_URL.apiUrl.concat("/franchise/temp-file"), formData)
                .subscribe({
                    next: (response: any) => {
                        console.log("Загруженные файлы франшизы:", response);
                        this.aNamesFranchisePhotos = response;
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
     * Функция изменит франшизу.
     * @returns - Данные созданной франшизы.
     */
      public async onEditFranchiseAsync() {
        console.log("onEditFranchiseAsync");
        console.log("log franchiseData", this.franchiseData);
        let newFranchiseData = this.franchiseData;

        try {
            let createUpdateFranchiseInput = new CreateUpdateFranchiseInput();
            let logoName = this.logoName;
            // let logoFormData = this.fileLogoFormData;
            let franchiseFiles = this.franchisePhotos;
            let lead = this.lead;
            let generalInvest = this.generalInvest;
            let royalty = this.royalty;
            let payback = this.payback;
            let profitMonth = this.profitMonth;
            let launchDate = this.launchDate;
            let activityDetail = this.activityDetail;
            let priceInvest = this.priceInvest;
            let nameInvest = this.nameInvest;
            let baseDate = this.baseDate;
            let yearStart = this.yearStart;
            let dotCount = this.dotCount;
            let businessCount = this.businessCount;
            let featureFranchise = this.featureFranchise;
            let defailsFranchise = this.defailsFranchise;
            let paymentDetails = this.paymentDetails;
            let namesIndicators = this.namesIndicators;
            let finIndicator1 = this.finIndicator1;
            let finIndicator2 = this.finIndicator2;
            let finIndicator3 = this.finIndicator3;
            let finIndicator4 = this.finIndicator4;
            let percentFinancial1 = this.percentFinancial1;
            let percentFinancial2 = this.percentFinancial2;
            let percentFinancial3 = this.percentFinancial3;
            let percentFinancial4 = this.percentFinancial4;
            let educationDetails = this.educationDetails;
            // let fileEducationFormData = this.fileEducationFormData;
            let packName = this.packName;
            let packDetails = this.packDetails;
            let packLumpSumPayment = this.packLumpSumPayment;
            let totalInvest = this.totalInvest;
            let videoLink = this.videoLink;
            let isGarant = this.isGarant || false;

            // Формирование json входит в инвестиции.
             // TODO: переделать на динамическое кол-во блоков.
            let investInJson = {
                Name: nameInvest,
                Price: priceInvest
            };

            // Формирование json фин.индикаторов.
            let namesIndicatorsJson = [
                {
                    Name: finIndicator1,
                    Price: percentFinancial1
                },

                {
                    Name: finIndicator2,
                    Price: percentFinancial2
                },

                {
                    Name: finIndicator3,
                    Price: percentFinancial3
                },

                {
                    Name: finIndicator4,
                    Price: percentFinancial4
                }
            ];

            // Формирование json пакетов.
            // TODO: переделать на динамическое кол-во блоков с пакетами.
            let packetJson = [
                {
                    Name: packName,
                    Text: packDetails,
                    LumpSumPayment: packLumpSumPayment,
                    Royalty: this.royaltyPack,
                    TotalInvest: totalInvest
                }
            ];

            let investInJsonString = JSON.stringify(investInJson);
            let namesIndicatorsJsonString = JSON.stringify(namesIndicatorsJson);
            let packetJsonString = JSON.stringify(packetJson);

            // createUpdateFranchiseInput.fileLogo = logoFormData;;
            // createUpdateFranchiseInput.franchisePhoto = franchiseFiles;
            createUpdateFranchiseInput.Status = newFranchiseData.status;
            createUpdateFranchiseInput.GeneralInvest = newFranchiseData.generalInvest;
            createUpdateFranchiseInput.LumpSumPayment = newFranchiseData.lumpSumPayment;
            createUpdateFranchiseInput.Royalty = newFranchiseData.royalty;
            createUpdateFranchiseInput.Payback = newFranchiseData.payback;
            createUpdateFranchiseInput.ProfitMonth = newFranchiseData.profitMonth;
            createUpdateFranchiseInput.LaunchDate = newFranchiseData.launchDate;
            createUpdateFranchiseInput.ActivityDetail = newFranchiseData.activityDetail;
            createUpdateFranchiseInput.BaseDate = newFranchiseData.baseDate;
            createUpdateFranchiseInput.YearStart = newFranchiseData.yearStart;
            createUpdateFranchiseInput.DotCount = newFranchiseData.dotCount;
            createUpdateFranchiseInput.BusinessCount = newFranchiseData.businessCount;
            createUpdateFranchiseInput.Peculiarity = newFranchiseData.peculiarity;
            createUpdateFranchiseInput.Text = newFranchiseData.text;
            createUpdateFranchiseInput.PaymentDetail = newFranchiseData.paymentDetail;
            // createUpdateFranchiseInput.trainingPhoto = fileEducationFormData;
            createUpdateFranchiseInput.UrlVideo = newFranchiseData.urlVideo;
            createUpdateFranchiseInput.IsGarant = newFranchiseData.isGarant ?? false;
            createUpdateFranchiseInput.InvestInclude = JSON.stringify(this.aInvestInclude);;
            createUpdateFranchiseInput.FinIndicators = JSON.stringify(this.aFinIndicators);
            createUpdateFranchiseInput.NameFinIndicators = newFranchiseData.nameFinIndicators;
            createUpdateFranchiseInput.FranchisePacks = JSON.stringify(this.aPacks);
            createUpdateFranchiseInput.IsNew = false;
            createUpdateFranchiseInput.Title = newFranchiseData.title;
            createUpdateFranchiseInput.TrainingDetails = newFranchiseData.trainingDetails;
            createUpdateFranchiseInput.Category = newFranchiseData.category;
            createUpdateFranchiseInput.SubCategory = newFranchiseData.subCategory;

            let sendFormData = new FormData();
            sendFormData.append("franchiseDataInput", JSON.stringify(createUpdateFranchiseInput));
            sendFormData.append("filesLogo", this.fileLogoFormData);
            sendFormData.append("urlsDetails", this.franchisePhotos);
            sendFormData.append("trainingPhoto", this.fileEducationFormData);
            sendFormData.append("finModelFile", this.modelFile);
            sendFormData.append("presentFile", this.presentFile);
            sendFormData.append("franchiseFile", this.presentFile);

            await this.http.post(API_URL.apiUrl.concat("/franchise/create-update-franchise"), sendFormData)
                .subscribe({
                    next: (response: any) => {
                        console.log("Франшиза успешно изменена:", response);
                        this.showMessageAfterSuccessEditFranchise();
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
     * Функция покажет сообщение об успешном изменении франшизы.
     */
     private showMessageAfterSuccessEditFranchise() {
        this.messageService.add({
            severity: 'success',
            summary: 'Успешно!',
            detail: 'Франшиза успешно изменена'
        });
    };
}
