import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CreateUpdateBusinessInput } from "src/app/models/business/input/business-create-update-input";
import { GetBusinessInput } from "src/app/models/business/input/get-business-input";
import { RequestBusinessInput } from "src/app/models/request/input/request-business-input";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "view-ready-business",
    templateUrl: "./view-ready-business.component.html",
    styleUrls: ["./view-ready-business.component.scss"],
    providers: [ConfirmationService, MessageService]
})

/** 
 * Класс модуля просмотра бизнеса.
 */
export class ViewReadyBusinessModule implements OnInit {
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
    routeParam: any;
    businessId: number = 0;
    businessData: any = [];
    aBusinessPhotos: any = [];
    userName: string = "";
    number: string = "";

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
        await this.getTransitionAsync();
    };

    public ngOnAfterViewInit() {
        this.aBusinessPhotos = this.aNamesBusinessPhotos;
        console.log("aBusinessPhotos",this.aBusinessPhotos);
    };

    private async getTransitionAsync() {
        try {
            let businessId = 0;

            if (this.businessId <= 0 || this.businessId == undefined) {
                businessId = this.route.snapshot.queryParams.businessId;
            }

            else {
                businessId = this.businessId;
            }           

            await this.commonService.getTransitionAsync().then((data: any) => {
                console.log("Переход получен:", data);
                this.getViewBusinessAsync(businessId);
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит данные бизнеса, которые нужно изменить.
     * @returns - данные бизнеса.
     */
     private async getViewBusinessAsync(businessId: number) {
        try {                     
            console.log("getViewBusinessAsync");        
            let getFranchiseInput = new GetBusinessInput();
            getFranchiseInput.BusinessId = businessId;
            getFranchiseInput.Mode = "View";

            await this.http.post(API_URL.apiUrl.concat("/business/get-business"), getFranchiseInput)
                .subscribe({
                    next: (response: any) => {                        
                        this.businessData.push(response);                                                    
                        this.aPriceIn = JSON.parse(response.investPrice);                                                

                        // Запишет пути изображений бизнеса.
                        // this.businessData.forEach((item: any) => {
                        //     this.aNamesBusinessPhotos = item.urlsBusiness;
                        // });
                        this.aNamesBusinessPhotos = response.urlsBusiness.split(",");

                        console.log("Полученный бизнес:", response);
                        console.log("businessData", this.businessData);      
                        console.log("aPriceIn", this.aPriceIn);
                        console.log("aBusinessPhotos", this.aNamesBusinessPhotos);
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
     * Функция изменит бизнес.
     * @returns - Данные бизнеса.
     */
    public async onEditBusinessAsync() {
        console.log("onEditBusinessAsync");    

        try {
            let createUpdateBusinessInput = new CreateUpdateBusinessInput();        
            let newBusinessData = this.businessData[0];    
            let lead = newBusinessData.status;
            let payback = newBusinessData.payback;
            let profitability = newBusinessData.profitability;
            let activityDetail = newBusinessData.activityDetail;
            let defailsFranchise = newBusinessData.defailsFranchise;
            let priceIn = newBusinessData.priceIn;
            let videoLink = newBusinessData.urlVideo;
            let isGarant = newBusinessData.isGarant || false;       
            let peculiarity = newBusinessData.peculiarity;   
            let businessName = newBusinessData.businessName;        
            let price = +newBusinessData.price;               
            let turnPrice = newBusinessData.turnPrice;
            let profitPrice = newBusinessData.profitPrice;
            let businessAge = newBusinessData.businessAge;
            let employeeYearCount = newBusinessData.employeeYearCount;
            let form = newBusinessData.form;
            let share = newBusinessData.share;
            let site = newBusinessData.site;
            let text = newBusinessData.text;
            let assets = newBusinessData.assets;
            let reasonsSale = newBusinessData.reasonsSale;
            let address = newBusinessData.address;
            // let aPriceInData = JSON.parse(this.aPriceIn);
            let aNamesBusinessPhotos = this.aNamesBusinessPhotos;

            // Уберет флаги видимости.
            let newPriceInJson = this.aPriceIn.map((item: any) => ({
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
            createUpdateBusinessInput.IsNew = false;
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
                        console.log("Бизнес успешно изменен:", response);
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

     /**
     * Функция создаст заявку бизнеса.
     * @param userName Имя.
     * @param number Телефон.
     * @param businessId Id бизнеса.
     * @returns Данные заявки.
     */
      public async onCreateRequestBusinessAsync(userName: string, number: string, businessId: number) {
        try {                     
            console.log("onCreateRequestBusinessAsync");        
            let requestBusinessInput = new RequestBusinessInput();   

            if (userName == "" || number == "" || businessId <= 0) {
                return;
            }

            requestBusinessInput.UserName = userName;
            requestBusinessInput.Phone = number;
            requestBusinessInput.BusinessId = businessId;

            await this.http.post(API_URL.apiUrl.concat("/request/create-request-business"), requestBusinessInput)
                .subscribe({
                    next: (response: any) => {
                        console.log("Заявка успешно создана", response); 
                        
                        if (response.isSuccessCreatedRequest) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Успешно!',
                                detail: response.statusText
                            });    
                        }                                       
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