import {HttpClient} from "@angular/common/http";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {API_URL} from "src/app/core/core-urls/api-url";
import {CreateUpdateBusinessInput} from "src/app/models/business/input/business-create-update-input";
import {GetBusinessInput} from "src/app/models/business/input/get-business-input";
import {CommonDataService} from "src/app/services/common/common-data.service";

@Component({
    selector: "edit-ready-business",
    templateUrl: "./edit-ready-business.component.html",
    styleUrls: ["./edit-ready-business.component.scss"],
    providers: [ConfirmationService, MessageService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * Класс модуля изменения бизнеса.
 */
export class EditReadyBusinessModule implements OnInit {
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
    aPriceIn: any = [];
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
    filesAssetsCounter!: number;
    filesReasonsSale: any;
    filesTextBusiness: any;
    filesBusiness: any;
    routeParam: any;
    businessId: number = 0;
    businessData: any = [];
    aBusinessPhotos: any = [];

     constructor(private http: HttpClient,
        private commonService: CommonDataService,
        private messageService: MessageService,
        private changeDetector: ChangeDetectorRef,
        private route: ActivatedRoute) {
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

this.routeParam = this.route.snapshot.queryParams;
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

            await this.commonService.getTransitionAsync(this.routeParam).then((data: any) => {
                console.log("Переход получен:", data);
                this.getViewBusinessAsync(businessId);
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

  /**
   * Функция обновит компонент. Использовать после изменений
   * @returns - данные бизнеса.
   */
    private updateComponent() {
      this.changeDetector.detectChanges()
    }

    /**
     * Функция получит данные бизнеса, которые нужно изменить.
     * @returns - данные бизнеса.
     */
    private async getViewBusinessAsync(businessId: number) {
        try {
            console.log(businessId); // 1000006
            let getFranchiseInput = new GetBusinessInput();
            getFranchiseInput.BusinessId = businessId;
            getFranchiseInput.Mode = "View";

            await this.http.post(API_URL.apiUrl.concat("/business/get-business"), getFranchiseInput)
                .subscribe({
                    next: (response: any) => {
                        // Уберет пробелы у числа.
                        response.price = this.commonService.TrimSpaceInNumber(response.price);

                        this.businessData = response;
                        this.aPriceIn = JSON.parse(response.investPrice);

                        this.updateComponent()
                        // Запишет пути изображений бизнеса.
                        // this.businessData.forEach((item: any) => {
                        //     this.aNamesBusinessPhotos = item.urlsBusiness;
                        // });

                        // this.businessData.urlsBusiness.forEach((item: any) => {
                        //     this.aNamesBusinessPhotos = item.urlsBusiness;
                        // });

                        console.log("Полученный бизнес:", response);
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
            let newBusinessData = this.businessData;

            let isGarant = newBusinessData.isGarant || false;
            let price = +newBusinessData.price;
            let {status: lead, payback, profitability, activityDetail, defailsFranchise, priceIn, urlVideo: videoLink, peculiarity, businessName, turnPrice, profitPrice, businessAge, employeeCountYear: employeeYearCount, form, share, site, text, assets, reasonsSale, address} = newBusinessData

            let aNamesBusinessPhotos = this.aNamesBusinessPhotos;

            // Уберет флаги видимости.
            let newPriceInJson = this.aPriceIn.map((item: any) => ({
                Price: item,
                Name: item,
            }));

            console.log(newPriceInJson)

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
            createUpdateBusinessInput.Category = newBusinessData.category;
            createUpdateBusinessInput.SubCategory = newBusinessData.subCategory;

            // createUpdateBusinessInput = {...newBusinessData}

            console.log(Object.keys(createUpdateBusinessInput)[0].toLocaleUpperCase())

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
        this.filesAssetsCounter = event.target.files.length;
        this.filesAssets = event.target.files[0];

        this.updateComponent()
    };

    /**
     * Функция добавит файл причин продажи бизнеса.
     */
    public uploadReasonsSalePhotosAsync(event: any) {
        console.log("uploadReasonsSalePhotosAsync");
        this.filesReasonsSale = event.target.files[0];

        this.updateComponent()
    };

     /**
     * Функция добавит файл фин.модели.
     */
    public uploadFinModelAsync(event: any) {
        console.log("uploadFinModelAsync");
        this.modelFile = event.target.files[0];

        this.updateComponent()
    };

     /**
     * Функция добавит файл деятельности бизнеса.
     */
      public uploadTextBusinessPhotosAsync(event: any) {
        console.log("uploadTextBusinessPhotosAsync");
        this.filesTextBusiness = event.target.files[0];

        this.updateComponent()
    };

    /**
     * Функция покажет сообщение об успешном создании франшизы.
     */
    private showMessageAfterSuccessCreateBusiness() {
        this.messageService.add({
            severity: 'success',
            summary: 'Успешно!',
            detail: 'Бизнес успешно изменен'
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

            this.updateComponent()

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

        this.updateComponent()

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

                        this.updateComponent()
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
