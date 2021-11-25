import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CreateUpdateFranchiseInput } from "src/app/models/franchise/input/franchise-create-update-input";
import { CommonDataService } from "src/app/services/common-data.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "create-franchise",
    templateUrl: "./create-franchise.component.html",
    styleUrls: ["./create-franchise.component.scss"],
    providers: [ConfirmationService, MessageService]
})

/** 
 * Класс модуля создания франшизы.
 */
export class CreateFranchiseModule implements OnInit {
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
    priceInvest?: string;
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
    ainvestIn: any;
    ind: number = 0;
    aPacks: any;
    pInd: number = 0;
    fio: string = "";
    routeParamCategory: any;
    routeParamSubCategory: any;
    routeParamSubCity: any;

    constructor(private http: HttpClient,
        private commonService: CommonDataService,
        private messageService: MessageService,
        private route: ActivatedRoute) {
        this.routeParamCategory = this.route.snapshot.queryParams.category;
        this.routeParamSubCategory = this.route.snapshot.queryParams.subCategory;
        this.routeParamSubCity = this.route.snapshot.queryParams.city;

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

        // Первоначальная инициализация инвестиций.
        this.ainvestIn = [
            {
                Name: "",
                Price: "",
                isHideInvest: false
            }
        ];

        // Первоначальная инициализация пакетов.
        this.aPacks = [
            {
                Name: "",
                Text: "",
                LumpSumPayment: "",
                Royalty: "",
                TotalInvest: "",
                IsHidePack: false
            }
        ];

        console.log("ainvestIn", this.ainvestIn);
        console.log("aPacks", this.aPacks);
    };

    public async ngOnInit() {
        await this.getUserFio();
    };

    public async uploadFranchisePhotosAsync(event: any) {
        try {
            let fileList = event.target.files;
            let formData: FormData = new FormData();

            for (let i = 0; i < fileList.length; i++) {
                formData.append('files', fileList[i]); 
            }        

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
     * Функция создаст новую франшизу.
     * @returns - Данные созданной франшизы.
     */
    public async onCreateFranchiseAsync() {
        console.log("onCreateFranchiseAsync");

        try {
            let createUpdateFranchiseInput = new CreateUpdateFranchiseInput();
            let logoName = this.logoName;
            let lead = this.lead;
            let generalInvest = this.generalInvest;
            let royalty = this.royalty;
            let payback = this.payback;
            let profitMonth = this.profitMonth;
            let launchDate = this.launchDate;
            let activityDetail = this.activityDetail;
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
            let videoLink = this.videoLink;
            let isGarant = this.isGarant || false;

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

            // Уберет ключи флагов.
            let newainvestIn = this.ainvestIn.map((item: any) => ({
                Name: item.Name,
                Price: item.Price
            }));

            let investInJsonString = JSON.stringify(newainvestIn);

            let namesIndicatorsJsonString = JSON.stringify(namesIndicatorsJson);

            // Уберет ключи флагов.
            let newPacks = this.aPacks.map((item: any) => ({
                Name: item.Name,
                Text: item.Text,
                LumpSumPayment: item.LumpSumPayment,
                Royalty: item.Royalty,
                TotalInvest: item.TotalInvest
            }))

            let packetJsonString = JSON.stringify(newPacks);
            createUpdateFranchiseInput.Status = lead;
            createUpdateFranchiseInput.GeneralInvest = generalInvest;
            createUpdateFranchiseInput.LumpSumPayment = this.lumpSumPayment;
            createUpdateFranchiseInput.Royalty = royalty;
            createUpdateFranchiseInput.Payback = payback;
            createUpdateFranchiseInput.ProfitMonth = profitMonth;
            createUpdateFranchiseInput.LaunchDate = launchDate;
            createUpdateFranchiseInput.ActivityDetail = activityDetail;
            createUpdateFranchiseInput.BaseDate = baseDate;
            createUpdateFranchiseInput.YearStart = yearStart;
            createUpdateFranchiseInput.DotCount = dotCount;
            createUpdateFranchiseInput.BusinessCount = businessCount;
            createUpdateFranchiseInput.Peculiarity = featureFranchise;
            createUpdateFranchiseInput.Text = defailsFranchise;
            createUpdateFranchiseInput.PaymentDetail = paymentDetails;
            createUpdateFranchiseInput.UrlVideo = videoLink;
            createUpdateFranchiseInput.IsGarant = isGarant;
            createUpdateFranchiseInput.InvestInclude = investInJsonString;
            createUpdateFranchiseInput.FinIndicators = namesIndicatorsJsonString;
            createUpdateFranchiseInput.NameFinIndicators = namesIndicators;
            createUpdateFranchiseInput.FranchisePacks = packetJsonString;
            createUpdateFranchiseInput.IsNew = true;
            createUpdateFranchiseInput.Title = logoName;
            createUpdateFranchiseInput.TrainingDetails = educationDetails;
            createUpdateFranchiseInput.Category = this.routeParamCategory;
            createUpdateFranchiseInput.SubCategory = this.routeParamSubCategory;
            createUpdateFranchiseInput.UrlsFranchise = this.aNamesFranchisePhotos;

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
                        console.log("Франшиза успешно создана:", response);
                        this.showMessageAfterSuccessCreateFranchise();
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

    /**
     * Функция покажет сообщение об успешном создании франшизы.
     */
    private showMessageAfterSuccessCreateFranchise() {
        this.messageService.add({
            severity: 'success',
            summary: 'Успешно!',
            detail: 'Франшиза успешно создана'
        });
    };

    /**
     * Функция нарастит блоки с данными входит в инвестиции.
     * @param priceInvest - цена.
     * @param nameInvest - название.
     */
    public onAddInveest(priceInvest: any, nameInvest: any) {
        if (this.ainvestIn.length == 1) {
            this.ainvestIn[0] = {
                Name: nameInvest,
                Price: priceInvest
            };

            this.ainvestIn.push(
                {
                    Name: "",
                    Price: ""
                }
            );

            this.ainvestIn[this.ind].isHideInvest = true;
            this.ind++;

            return;
        }

        this.ainvestIn[this.ind].Name = nameInvest;
        this.ainvestIn[this.ind].Price = priceInvest;

        this.ainvestIn.push(
            {
                Name: "",
                Price: ""
            }
        );

        this.ainvestIn[this.ind].isHideInvest = true;
        this.ind++;

        console.log("investInJson", this.ainvestIn);
    };

    /**
     * Функция нарастит блоки с пакетами.
     * @param packName - название пакета.
     * @param packDetails - детали пакета.
     * @param packLumpSumPayment - паушальный взнос.
     * @param royaltyPack - роялти.
     * @param totalInvest - всего инвестиций.
     */
    public onAddPack(packName: any, packDetails: any, packLumpSumPayment: any, royaltyPack: any, totalInvest: any) {
        if (this.aPacks.length == 1) {
            this.aPacks[0] = {
                Name: packName,
                Text: packDetails,
                LumpSumPayment: packLumpSumPayment,
                Royalty: royaltyPack,
                TotalInvest: totalInvest
            };

            this.aPacks.push(
                {
                    Name: "",
                    Text: "",
                    LumpSumPayment: "",
                    Royalty: "",
                    TotalInvest: ""
                }
            );

            this.aPacks[this.pInd].IsHidePack = true;
            this.pInd++;

            return;
        }

        this.aPacks[this.pInd].Name = packName;
        this.aPacks[this.pInd].Text = packDetails;
        this.aPacks[this.pInd].LumpSumPayment = packLumpSumPayment;
        this.aPacks[this.pInd].Royalty = royaltyPack;
        this.aPacks[this.pInd].TotalInvest = totalInvest;

        this.aPacks.push(
            {
                Name: "",
                Text: "",
                LumpSumPayment: "",
                Royalty: "",
                TotalInvest: ""
            }
        );

        this.aPacks[this.ind].IsHidePack = true;
        this.pInd++;

        console.log("packs", this.aPacks);
    };

    public onCheckedGarant() {
        console.log("isGarant", this.isGarant);
    };

    private async getUserFio() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/user/user-fio"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("fio data:", response);
                        this.fio = response.fullName;
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