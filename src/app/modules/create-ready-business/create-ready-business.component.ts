import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CreateUpdateBusinessInput } from "src/app/models/business/business-create-update-input";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "create-ready-business",
    templateUrl: "./create-ready-business.component.html",
    styleUrls: ["./create-ready-business.component.scss"],
    providers: [ConfirmationService, MessageService]
})

export class CreateReadyBusinessModule implements OnInit {
    
    responsiveOptions: any;
    aNamesBusinessPhotos: any = [];
    lead: string = "";
    payback: number = 0;
    peculiarity: string = "";
    isGarant: boolean = false;
    activityDetail: string = "";
    defailsFranchise: string = "";
    priceIn: number = 0;
    nameIn = "";
    videoLink: string = "";
    modelFile: any;
    ind: number = 0;
    fio: string = "";
    aPriceIn: any;
    price: number = 0;
    turnPrice: number = 0;
    profitPrice: number = 0;
    profitability: number = 0;
    businessAge: number = 0;
    employeeYearCount: number = 0;
    form: string = "";
    share: number = 0;
    site: string = "";
    text: string = "";
    assets: string = "";
    filesAssetsFormData: any;
    reasonsSale: string = "";
    address: string = "";
    isHideVideo: boolean = false;
    businessName: string = "";
    activityPhotoName: any;
    filesAssets: any;
    filesReasonsSale: any;
    filesTextBusiness: any;
    filesBusiness: any;

    constructor(private http: HttpClient,
        private commonService: CommonDataService, 
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

            // Первоначальная инициализация входит в стоимость.
        this.aPriceIn = [
            {
                Name: "",            
                Price: "",
                isHide: false
            }
        ];

        console.log("aPriceIn", this.aPriceIn);
    };

    public async ngOnInit() {
        await this.getUserFio();
    };

    // TODO: доработать множественную загрузку файлов.
    public async uploadBusinessPhotosAsync(event: any) {
        try {
            let fileList = event.target.files[0];
            let files: File = fileList;
            let formData: FormData = new FormData();
            formData.append('files', files);           

            await this.http.post(API_URL.apiUrl.concat("/business/temp-file"), formData)
                .subscribe({
                    next: (response: any) => {
                        console.log("Загруженные файлы бизнеса:", response);
                        this.aNamesBusinessPhotos = response;                        
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
     * Функция создаст новый бизнес.
     * @returns - Данные созданного бизнеса.
     */
    public async onCreateBusinessAsync() {
        console.log("onCreateBusinessAsync");    

        try {
            let createUpdateBusinessInput = new CreateUpdateBusinessInput();            
            let lead = this.lead;
            let payback = this.payback;
            let profitability = this.profitability;
            let activityDetail = this.activityDetail;
            let defailsFranchise = this.defailsFranchise;
            let priceIn = this.priceIn;
            let videoLink = this.videoLink;
            let isGarant = this.isGarant || false;       
            let peculiarity = this.peculiarity;   
            let businessName = this.businessName;        
            let price = this.price;               
            let turnPrice = this.turnPrice;
            let profitPrice = this.profitPrice;
            let businessAge = this.businessAge;
            let employeeYearCount = this.employeeYearCount;
            let form = this.form;
            let share = this.share;
            let site = this.site;
            let text = this.text;
            let assets = this.assets;
            let reasonsSale = this.reasonsSale;
            let address = this.address;
            let aPriceInData = this.aPriceIn;
            let aNamesBusinessPhotos = this.aNamesBusinessPhotos;

            // Уберет флаги видимости.
            let newPriceInJson = aPriceInData.map((item: any) => ({
                Price: item.Price,
                Name: item.Name
            }));

            let priceInJson = JSON.stringify(newPriceInJson);

            createUpdateBusinessInput.Status = lead;
            createUpdateBusinessInput.Payback = payback;
            createUpdateBusinessInput.ActivityDetail = activityDetail;            
            createUpdateBusinessInput.Peculiarity = peculiarity;
            createUpdateBusinessInput.Text = defailsFranchise;
            createUpdateBusinessInput.UrlVideo = videoLink;
            createUpdateBusinessInput.IsGarant = isGarant;
            createUpdateBusinessInput.IsNew = true;
            createUpdateBusinessInput.BusinessName = businessName;
            createUpdateBusinessInput.Price = price;
            createUpdateBusinessInput.TurnPrice = turnPrice;
            createUpdateBusinessInput.ProfitPrice = profitPrice;
            createUpdateBusinessInput.Profitability = profitability;
            createUpdateBusinessInput.BusinessAge = businessAge;
            createUpdateBusinessInput.EmployeeCountYear = employeeYearCount;
            createUpdateBusinessInput.Form = form;
            createUpdateBusinessInput.Share = share;
            createUpdateBusinessInput.Site = site;
            createUpdateBusinessInput.Text = text;
            createUpdateBusinessInput.Assets = assets;
            createUpdateBusinessInput.ReasonsSale = reasonsSale;
            createUpdateBusinessInput.Address = address;
            createUpdateBusinessInput.InvestPrice = priceInJson;            
            createUpdateBusinessInput.UrlsBusiness = aNamesBusinessPhotos;         

            // TODO: заменить на динамическое определение категории франшизы.
            createUpdateBusinessInput.Category = "Тестовая категория";

            // TODO: заменить на динамическое определение категории франшизы.
            createUpdateBusinessInput.SubCategory = "Тестовая подкатегория";

            let sendFormData = new FormData();
            sendFormData.append("businessDataInput", JSON.stringify(createUpdateBusinessInput));
            sendFormData.append("filesAssets", this.filesAssets);
            sendFormData.append("filesReasonsSale", this.filesReasonsSale);
            sendFormData.append("finModelFile", this.modelFile);
            sendFormData.append("filesTextBusiness", this.filesTextBusiness);

            await this.http.post(API_URL.apiUrl.concat("/business/create-update-business"), sendFormData)
                .subscribe({
                    next: (response: any) => {
                        console.log("Бизнес успешно создан:", response);
                        this.showMessageAfterSuccessCreateBusiness();
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
     * Функция добавит файл активов бизнеса.
     */
    public uploadAssetsBusinessPhotosAsync(event: any) {
        console.log("uploadAssetsBusinessPhotosAsync");
        this.filesAssets = event.target.files[0];
    };

    /**
     * Функция добавит файл причин продажи бизнеса.
     */
    public uploadReasonsSalePhotosAsync(event: any) {
        console.log("uploadReasonsSalePhotosAsync");
        this.filesReasonsSale = event.target.files[0];
    };

     /**
     * Функция добавит файл фин.модели.
     */
    public uploadFinModelAsync(event: any) {
        console.log("uploadFinModelAsync");
        this.modelFile = event.target.files[0];
    };

     /**
     * Функция добавит файл деятельности бизнеса.
     */
      public uploadTextBusinessPhotosAsync(event: any) {
        console.log("uploadTextBusinessPhotosAsync");
        this.filesTextBusiness = event.target.files[0];
    };

    /**
     * Функция покажет сообщение об успешном создании франшизы.
     */
    private showMessageAfterSuccessCreateBusiness() {
        this.messageService.add({
            severity: 'success',
            summary: 'Успешно!',
            detail: 'Бизнес успешно создан'
        });
    };

    /**
     * Функция нарастит блоки с данными входит в стоимость.
     * @param priceIn - цена.
     * @param nameIn - название.
     */
     public onAddPriceIn(priceIn: any, nameIn: any) {     
        if (this.aPriceIn.length == 1) {
            this.aPriceIn[0] = {
                Name: nameIn,
                Price: priceIn
            };           

            this.aPriceIn.push(
                {
                    Name: "",
                    Price: ""
                }
            );
            
            this.aPriceIn[this.ind].isHide = true;
            this.ind++;

            return;
        }

        this.aPriceIn[this.ind].Name = nameIn;
        this.aPriceIn[this.ind].Price = priceIn;

        this.aPriceIn.push(
            {
                Name: "",
                Price: ""
            }
        );

        this.aPriceIn[this.ind].isHide = true;
        this.ind++;

        console.log("aPriceIn", this.aPriceIn);
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