import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { API_URL } from "src/app/core/core-urls/api-url";
import { ArticleInput } from "src/app/models/blog/article-input";
import { BlogInput } from "src/app/models/blog/blog-input";
import { NewsInput } from "src/app/models/blog/news-input";
import { CreateUpdateBusinessInput } from "src/app/models/business/input/business-create-update-input";
import { CreateUpdateFranchiseInput } from "src/app/models/franchise/input/franchise-create-update-input";
import { CommonDataService } from "src/app/services/common/common-data.service";
import { FinData } from "src/app/shared/classes/fin-data";
import { FORM_ERRORS, FORM_PLACEHOLDERS, FORM_SUCCESS, FORM_VALIDATION_MESSAGES } from "src/app/shared/classes/form-data";
import { sumValidator } from "src/app/shared/classes/custom-validators";
import { Router } from "@angular/router";

@Component({
    selector: "configurator-admin",
    templateUrl: "./configurator-admin.component.html",
    styleUrls: ["./configurator-admin.component.scss"],
    providers: [ConfirmationService, MessageService]
})

/** 
 * Класс модуля конфигуратора (панель).
 */
export class ConfiguratorAdminModule implements OnInit {
    aMenuList: any[] = [];
    tabIndex: number = 0;
    selectedBlogAction: any;
    selectedNewsAction: any;
    aBlogActions: any[] = [];
    aBlogThemes: any[] = [];
    selectedBlogCodeTheme: string = "";
    blogFile: any;
    blogTitle: string = "";
    aBlogs: any[] = [];
    oEditBlog: any = {};
    oEditArticle: any = {};
    selectedBlog: any;
    selectedFranchise: any;
    selectedBusiness: any;
    selectedFranchiseId: number = 0;
    selectedBusinessId: number = 0;
    aArticleThemes: any[] = [];
    selectedTheme: any;
    articleTitle: string = "";
    articleDescription: string = "";
    previewFile: any;
    articleText: string = "";
    articleFile: any;
    signature: string = "";
    selectedBlogId: number = 0;
    shortArticleDescription: string = "";
    isNew: boolean = false;
    aCardActions: any[] = [];
    logoName?: string;
    responsiveOptions: any;
    aNamesFranchisePhotos: any = [];
    aFiles: any[] = [];
    lead: any;
    generalInvest?: number;
    lumpSumPayment?: number;
    royalty?: number;
    royaltyPack?: number;
    payback: any;
    profitMonth?: number;
    launchDate?: number;
    priceInvest?: string;
    nameInvest?: string;
    baseDate?: number;
    yearStart?: number;
    dotCount?: number;
    businessCount?: number;
    peculiarity: any;
    isHidePacks?: boolean;
    packName?: string;
    packDetails?: string;
    packLumpSumPayment?: string;
    isGarant: boolean = false;
    fileLogoFormData?: any;
    franchisePhotos: any;
    fileEducationFormData: any;
    activityDetail: any;
    featureFranchise?: string;
    defailsFranchise: any;
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
    videoLink: any;
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
    selectedCardAction: any;
    aFranchises: any[] = [];
    aBusinessList: any[] = [];
    franchiseId: number = 0;
    franchiseData: any = [];
    routeParam: any;
    aInvestInclude: any = [];
    aFinIndicators: any[] = [];
    aFranchisePhotos: any[] = [];
    aNamesBusinessPhotos: any = [];
    // payback: number = 0;
    priceIn: number = 0;
    nameIn = "";
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
    filesAssetsCounter!: number;
    filesReasonsSale: any;
    filesTextBusiness: any;
    filesBusiness: any;
    routeParamCity: any;

    // formLabels = FORM_LABELS;
    formPlaceholders = FORM_PLACEHOLDERS;
    formSuccess = FORM_SUCCESS;
    formErrors: any = FORM_ERRORS;
    validationMessages: any = FORM_VALIDATION_MESSAGES;

    finDataForm!: FormGroup;

    // price!: AbstractControl;
    // turnPrice!: AbstractControl;
    // profitPrice!: AbstractControl;
    // profitability!: AbstractControl;
    // businessAge!: AbstractControl;
    businessId: number = 0;
    businessData: any = [];
    aBusinessPhotos: any = [];
    selectedBlogArticleId: any;
    isEditArticle: boolean = false;
    finData: FinData = new FinData('', '', '', '', '', '');
    aBlogArticles: any[] = [];
    selectedBlogArticle: any;
    aNewsActions: any[] = [];
    newsFile: any;
    newsTitle: string = "";
    typeNews: any;
    textNews: string = "";
    oNews: any = {};
    selectedNews: any;
    aNews: any[] = [];

    constructor(private http: HttpClient, 
        private messageService: MessageService,
        private commonService: CommonDataService,
        private formBuilder: FormBuilder,
        private router: Router) {
        // TODO: переделать на вывод с бэка.
        this.aCardActions = [
            {
                cardActionSysName: "CreateFranchise",
                cardActionName: "Создать франшизу"
            },

            {
                cardActionSysName: "CreateBusiness",
                cardActionName: "Создать бизнес"
            },

            {
                cardActionSysName: "ChangeFranchise",
                cardActionName: "Изменить франшизу"
            },

            {
                cardActionSysName: "ChangeBusiness",
                cardActionName: "Изменить бизнес"
            }
        ];

        this.aNewsActions = [
            {
                newsActionSysName: "CreateNews",
                newsActionName: "Создать новость"
            },

            {
                newsActionSysName: "ChangeNews",
                newsActionName: "Изменить новость"
            }
        ];

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

        this.aPriceIn = [
            {
                Name: "",            
                Price: "",
                isHide: false
            }
        ];

        console.log("ainvestIn", this.ainvestIn);
        console.log("aPacks", this.aPacks);
    };

    public async ngOnInit() {
        await this.loadMenuItemsAsync();      
        // await this.getUserFio();  
        this.buildForm();
    };

    public ngOnAfterViewInit() {
        this.aBusinessPhotos = this.aNamesBusinessPhotos;
        console.log("aBusinessPhotos",this.aBusinessPhotos);
    };

    /**
     * Функция получит список действий для работы с блогами.
     * @returns - Список действий.
     */
    private async loadBlogActions() {
        try {                                             
            await this.http.get(API_URL.apiUrl.concat("/configurator/blog-actions"))
                .subscribe({
                    next: (response: any) => {                        
                        console.log("blog actions: ", response);
                        this.aBlogActions = response;
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
     * Функция получит список меню конфигуратора.
     * @returns - Список элементов меню.
     */
    private async loadMenuItemsAsync() {
        try {                                 
            await this.http.get(API_URL.apiUrl.concat("/configurator/menu-items"))
                .subscribe({
                    next: (response: any) => {                        
                        console.log("menu list:", response);
                        this.aMenuList = response;
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
     * Функция создаст новый блог.
     * @returns - Данные нового блога.
     */
    public async onCreateBlogAsync() {
        try {                     
            console.log("blogFile",this.blogFile);
            console.log("selectedBlogCodeTheme",this.selectedBlogCodeTheme);

            if (this.selectedBlogCodeTheme == "" || this.blogTitle == "") {
                return;
            }

            let blogInput = new BlogInput();
            blogInput.Title = this.blogTitle;
            blogInput.ThemeCategoryCode = this.selectedBlogCodeTheme;
            let formData = new FormData();

            formData.append("blogData", JSON.stringify(blogInput));
            formData.append("images", this.blogFile);
            
            if (blogInput.Title != "" && blogInput.ThemeCategoryCode != "") {
                await this.http.post(API_URL.apiUrl.concat("/blog/create-blog"), formData)
                    .subscribe({
                        next: (response: any) => {
                            console.log("Созданый блог: ", response);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Успешно!',
                                detail: 'Успешно сохранено'
                            });
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит список тем блогов.
     * @returns - Список тем блогов.
     */
    private async getBlogThemesAsync() {
        try {                                             
            await this.http.post(API_URL.apiUrl.concat("/blog/blog-themes"), {})
                .subscribe({
                    next: (response: any) => {                        
                        console.log("Темы блогов: ", response);
                        this.aBlogThemes = response;
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
     * Функция действий в зависимости от выбранного таба.
     * @param e - Событие таба.
     */
    public async onChangeTab(e: any) {
        console.log(e);
        this.tabIndex = e.index;

        switch (this.tabIndex) {
            case 0:
                await this.getNewsAsync();
                break;

            case 1:
                await this.loadBlogActions();
                await this.getBlogThemesAsync();
                await this.getBlogsAsync();
                await this.loadArticleThemesAsync();
                break;
        }
    };

    public uploadFileBlogAsync(e: any) {
        console.log("uploadFileBlogAsync");
        this.blogFile = e.target.files[0];
        console.log("blogFile",this.blogFile);
    };

    public uploadFileNewsAsync(e: any) {
        console.log("uploadFileNewsAsync");
        this.newsFile = e.target.files[0];
        console.log("newsFile",this.newsFile);
    };

    public uploadFilePreviewAsync(e: any) {
        console.log("uploadFilePreviewAsync");
        this.previewFile = e.target.files[0];
        console.log("previewFile",this.previewFile);
    };

    public uploadFileArticleAsync(e: any) {
        console.log("uploadFilePreviewAsync");
        this.articleFile = e.target.files[0];
        console.log("articleFile",this.articleFile);
    };

    public onSelectBlogTheme(e: any) {
        console.log(e);
        this.selectedBlogCodeTheme = e.themeCategoryCode;        
    };

    private async getBlogsAsync() {
        try {
            await this.commonService.onGetBlogsAsync().then((data: any) => {
                console.log("Список блогов: ", data);
                this.aBlogs = data;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит список тем для статей.
     * @returns - Список тем статей.
     */
    private async loadArticleThemesAsync() {
        try {                                             
            await this.http.get(API_URL.apiUrl.concat("/blog/get-article-themes"))
                .subscribe({
                    next: (response: any) => {                        
                        console.log("Список тем статей: ", response);
                        this.aArticleThemes = response;
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
     *  Функция создаст новую статью блога.
     * @param selectedBlogId 
     * @param selectedTheme 
     * @param articleTitle 
     * @param shortArticleDescription 
     * @param articleDescription 
     * @param signature 
     */
    public async onCreateArticleAsync(selectedBlogId: number, selectedTheme: any, articleTitle: string, shortArticleDescription: string, articleDescription: string, signature: string) {
        try {
            let formData = new FormData();
            formData.append("previewFile", this.previewFile);
            formData.append("articleFile", this.articleFile);

            let articleInput = new ArticleInput();
            articleInput.Title = articleTitle;
            articleInput.BlogId = selectedBlogId;
            articleInput.ThemeCode = this.selectedTheme;
            articleInput.Description = shortArticleDescription;
            articleInput.Text = articleDescription;
            articleInput.SignatureText = signature;

            formData.append("articleData", JSON.stringify(articleInput));         

            await this.http.post(API_URL.apiUrl.concat("/blog/create-article"), formData)
                .subscribe({
                    next: (response: any) => {                        
                        console.log(response);
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

    public async onSelectBlog(e: any, isNew: boolean, isEditArticle: boolean) {
        console.log("onSelectBlog",e);
        this.selectedBlogId = e.value.blogId;
        this.isNew = isNew;

        if (!this.isNew && !isEditArticle) {
            await this.getEditBlogAsync(this.selectedBlogId);
        }         

        if (isEditArticle) {
            await this.getBlogArticlesAsync(this.selectedBlogId);
        }
    };

    public async onSelectBlogArticle(e: any, isNew: boolean) {
        // await this.getEditBlogArticleAsync(this.selectedBlogArticleId);
        this.selectedBlogArticleId = e.value.articleId;
        console.log("onSelectBlogArticle",e);
        this.selectedBlogArticleId = e.value.articleId;

        if (!isNew) {
            // this.selectedBlogId
            await this.getEditBlogArticleAsync(this.selectedBlogArticleId);
        }
    };

    public onSelectThemeArticle(e: any) {
        console.log("onSelectThemeArticle",e);
        this.selectedTheme = e.value.themeCode;
        console.log("selectedTheme",this.selectedTheme);
    };

    public async onSelectNews(e: any, isNew: boolean) {
        this.selectedNews = e.value.newsId;
        console.log("selectedNews",e);
        this.selectedNews = e.value.newsId;

        if (!isNew) {
            await this.getEditNewsAsync(this.selectedNews);
        }
    };

     /**
     * Функция получит блог для изменения.
     * @returns - Данные блога.
     */
    private async getEditBlogAsync(blogId: number) {
        try {
            if (+this.selectedBlog.blogId > 0 && !this.isNew) {
                await this.http.get(API_URL.apiUrl.concat("/blog/get-blog?blogId=" + blogId))
                    .subscribe({
                        next: (response: any) => {
                            console.log("Блог для изменения: ", response);
                            // this.oEditBlog = response;
                            // this.selectedBlog.isPaid = response.isPaid;
                            this.blogTitle = response.title;
                            // this.selectedBlog.url = response.url;
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }            
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция изменит блог.
     * @returns - Измененные данные блога.
     */
    public async onEditBlogAsync() {
        try {                                 
            if (this.selectedBlogCodeTheme == "" || this.blogTitle == "") {
                return;
            }

            let blogInput = new BlogInput();
            blogInput.Title = this.blogTitle;
            blogInput.ThemeCategoryCode = this.selectedBlogCodeTheme;
            blogInput.BlogId = this.selectedBlogId;
            let formData = new FormData();

            formData.append("blogData", JSON.stringify(blogInput));
            formData.append("images", this.blogFile);
            
            if (blogInput.Title != "" && blogInput.ThemeCategoryCode != "") {
                await this.http.put(API_URL.apiUrl.concat("/blog/update-blog"), formData)
                    .subscribe({
                        next: (response: any) => {
                            console.log("Измененный блог: ", response);

                            this.messageService.add({
                                severity: 'success',
                                summary: 'Успешно!',
                                detail: 'Успешно изменено'
                            });
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    public async uploadFranchisePhotosAsync(event: any) {
        try {
            let fileList = event.target.files;
            let formData: FormData = new FormData();

            for (let i = 0; i < fileList.length; i++) {
                formData.append('files', fileList[i]); 
            }        

            await this.http.post(API_URL.apiUrl.concat("/configurator/temp-file"), formData)
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
            createUpdateFranchiseInput.Category = "Тестовая категория";
            createUpdateFranchiseInput.SubCategory = "Тестовая подкатегория";

            let sendFormData = new FormData();
            sendFormData.append("franchiseDataInput", JSON.stringify(createUpdateFranchiseInput));
            sendFormData.append("filesLogo", this.fileLogoFormData);
            // sendFormData.append("urlsDetails", this.franchisePhotos);
            sendFormData.append("trainingPhoto", this.fileEducationFormData);
            sendFormData.append("finModelFile", this.modelFile);
            sendFormData.append("presentFile", this.presentFile);
            sendFormData.append("franchiseFile", this.presentFile);

            await this.http.post(API_URL.apiUrl.concat("/configurator/create-update-franchise"), sendFormData)
                .subscribe({
                    next: (response: any) => {
                        console.log("Франшиза успешно создана:", response);

                        this.showMessageAfterSuccessCreateFranchise();

                        setTimeout(() => {
                            this.router.navigate(["/franchise/view"], { queryParams: { franchiseId: response.franchiseId, mode: "view" } });
                        }, 2000);                        
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
        event.stopPropagation();        
        this.fileLogoFormData = event.target.files[0];
        console.log("uploadFranchiseLogoAsync", this.fileLogoFormData);
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

    // private async getUserFio() {
    //     try {
    //         await this.http.post(API_URL.apiUrl.concat("/user/user-fio"), {})
    //             .subscribe({
    //                 next: (response: any) => {
    //                     console.log("fio data:", response);
    //                     this.fio = response.fullName;
    //                 },

    //                 error: (err) => {
    //                     this.commonService.routeToStart(err);
    //                     throw new Error(err);
    //                 }
    //             });
    //     }

    //     catch (e: any) {
    //         throw new Error(e);
    //     }
    // };

    public async onSelectCardAction(cardAction: any) {
        console.log("cardAction", cardAction);
        this.selectedCardAction = cardAction.cardActionSysName;

        if (this.selectedCardAction == "ChangeFranchise") {
            await this.getFranchisesListAsync();
        }

        if (this.selectedCardAction == "ChangeBusiness") {
            await this.getBusinessListAsync();
        }
    };

    /**
     * TODO: вынести в общий сервис.
     * Функция получит список франшиз.
     */
     private async getFranchisesListAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/franchise/catalog-franchise"), {})
                .subscribe({
                    next: (response: any) => {                        
                        this.aFranchises = response;
                        console.log("Список франшиз:", response);
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
     * TODO: Вынести в общий сервис.    
     * Функция получит список бизнеса.
     */
     private async getBusinessListAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/business/catalog-business"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Список бизнеса:", response);
                        this.aBusinessList = response;
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

    public async onSelectFranchise(e: any, isNew: boolean) {
        console.log("onSelectFranchise",e);
        this.selectedFranchiseId = e.value.franchiseId;
        this.isNew = isNew;

        if (!this.isNew) {
            await this.getEditFranchiseAsync(this.selectedFranchiseId);
        }
    };

    public async onSelectBusiness(e: any, isNew: boolean) {
        console.log("onSelectBusiness",e);
        this.selectedBusinessId = e.value.businessId;
        this.isNew = isNew;

        if (!this.isNew) {
            await this.getEditBusinessAsync(this.selectedBusinessId);
        }
    };

    /**
     * Функция получит франшизу для изменения.
     * @returns - Данные франшизы.
     */
     private async getEditFranchiseAsync(franchiseId: number) {
        try {
            if (+this.selectedFranchise.franchiseId > 0 && !this.isNew) {
                await this.http.get(API_URL.apiUrl.concat("/configurator/get-franchise?franchiseId=" + franchiseId))
                    .subscribe({
                        next: (response: any) => {
                            console.log("Франшиза для изменения: ", response);
                            console.log("Полученная франшиза:", response);
                            this.franchiseData = response;     
                            console.log("franchiseData", this.franchiseData);     
                            
                            this.aInvestInclude = [JSON.parse(response.investInclude)];
                            this.aFinIndicators = [JSON.parse(response.finIndicators)];
                            this.aPacks = [JSON.parse(response.franchisePacks)];
    
                            console.log("aInvestInclude", this.aInvestInclude);
                            console.log("aFinIndicators", this.aFinIndicators);
                            console.log("aPacks", this.aPacks);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }            
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
            createUpdateFranchiseInput.FranchiseId = this.franchiseData.franchiseId;   
            createUpdateFranchiseInput.UrlsFranchise = this.aNamesFranchisePhotos;    

            let sendFormData = new FormData();
            sendFormData.append("franchiseDataInput", JSON.stringify(createUpdateFranchiseInput));
            sendFormData.append("filesLogo", this.fileLogoFormData);
            // sendFormData.append("urlsDetails", this.franchisePhotos);
            sendFormData.append("trainingPhoto", this.fileEducationFormData);
            sendFormData.append("finModelFile", this.modelFile);
            sendFormData.append("presentFile", this.presentFile);
            sendFormData.append("franchiseFile", this.presentFile);

            await this.http.post(API_URL.apiUrl.concat("/configurator/create-update-franchise"), sendFormData)
                .subscribe({
                    next: (response: any) => {
                        console.log("Франшиза успешно изменена:", response);
                        this.showMessageAfterSuccessEditFranchise();
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
     * Функция покажет сообщение об успешном изменении франшизы.
     */
     private showMessageAfterSuccessEditFranchise() {
        this.messageService.add({
            severity: 'success',
            summary: 'Успешно!',
            detail: 'Франшиза успешно изменена'
        });
    };

    private buildForm() {
        this.finDataForm = this.formBuilder.group({
          price: [this.finData.price, [Validators.required, sumValidator]],
          turnPrice: [this.finData.turnPrice, [Validators.required, sumValidator]],
          profitPrice: [this.finData.profitPrice, [Validators.required, sumValidator]],
          payback: [this.finData.payback, [Validators.required, sumValidator]],
          profitability: [this.finData.profitability, [Validators.required, sumValidator]],
          businessAge: [this.finData.businessAge, [Validators.required, sumValidator]]
        })
    
         this.finDataForm.valueChanges.subscribe(() => this.onValueChanged());
        //  this.createControls()
      }
    
    //   private createControls(): void {
    //     this.price = this.finDataForm.controls.price,
    //     this.turnPrice = this.finDataForm.controls.turnPrice,
    //     this.profitPrice = this.finDataForm.controls.profitPrice,
    //     this.payback = this.finDataForm.controls.payback,
    //     this.profitability = this.finDataForm.controls.profitability,
    //     this.businessAge = this.finDataForm.controls.businessAge
    //   }
    
      onValueChanged(): void {
             const form = this.finDataForm;
  
             console.log(this.finDataForm);
             console.log(this.finData);
  
             Object.keys(this.finDataForm.value).forEach((key) => {
               console.log(key);
               console.log(this.finDataForm.value[key]);
               this.finDataForm.value[key] = (String(this.finDataForm.value[key]).replace(/(\d)(?=(\d{3})+$)/g, '$1 '))
               console.log(this.finDataForm.value[key]);   
            });
             console.log(this.finDataForm);
             console.log(this.finData);
             
              
  
             console.log(this.formErrors);
        
             Object.keys(this.formErrors).forEach(field => {
               this.formErrors[field] = '';
    
               const control = form.get(field);
              
               if ((control?.dirty || control?.touched) && control.invalid) {
                 const message = this.validationMessages[field];
                 Object.keys(control.errors as any).some(key => this.formErrors[field] = message[key])
               }
             })
       }
  
      public async uploadBusinessPhotosAsync(event: any) {
          try {
              let fileList = event.target.files;
              let formData: FormData = new FormData();
  
              for (let i = 0; i < fileList.length; i++) {
                  formData.append('files', fileList[i]); 
              }           
  
              await this.http.post(API_URL.apiUrl.concat("/configurator/temp-file"), formData)
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
            // createUpdateBusinessInput.Category = this.routeParamCategory;
            // createUpdateBusinessInput.SubCategory = this.routeParamSubCategory;
            createUpdateBusinessInput.Category = "Тестовая категория";
            createUpdateBusinessInput.SubCategory = "Тестовая подкатегория";

            let sendFormData = new FormData();
            sendFormData.append("businessDataInput", JSON.stringify(createUpdateBusinessInput));
            sendFormData.append("filesAssets", this.filesAssets);
            sendFormData.append("filesReasonsSale", this.filesReasonsSale);
            sendFormData.append("finModelFile", this.modelFile);
            sendFormData.append("filesTextBusiness", this.filesTextBusiness);
  
              await this.http.post(API_URL.apiUrl.concat("/configurator/create-update-business"), sendFormData)
                  .subscribe({
                      next: (response: any) => {
                          console.log("Бизнес успешно создан:", response);
                          this.showMessageAfterSuccessCreateBusiness();
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
       * Функция добавит файл активов бизнеса.
       */
      public uploadAssetsBusinessPhotosAsync(event: any) {
          console.log("uploadAssetsBusinessPhotosAsync");
          this.filesAssetsCounter = event.target.files.length;
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

      /**
     * Функция получит данные бизнеса, которые нужно изменить.
     * @returns - данные бизнеса.
     */
     private async getEditBusinessAsync(businessId: number) {
        try {                     
            console.log("getEditBusinessAsync");        

            await this.http.get(API_URL.apiUrl.concat("/configurator/get-business?businessId=" + businessId))
                .subscribe({
                    next: (response: any) => {                        
                        this.businessData = response;                                                    
                        this.aPriceIn = JSON.parse(response.investPrice);                                                

                        // Запишет пути изображений бизнеса.
                        // this.businessData.forEach((item: any) => {
                        //     this.aNamesBusinessPhotos = item.urlsBusiness;
                        // });

                        // this.businessData.urlsBusiness.forEach((item: any) => {
                        //     this.aNamesBusinessPhotos = item.urlsBusiness;
                        // });

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

    /**
     * Функция изменит бизнес.
     * @returns - Данные бизнеса.
     */
    public async onEditBusinessAsync() {
        console.log("onEditBusinessAsync");    

        try {
            let createUpdateBusinessInput = new CreateUpdateBusinessInput();        
            let newBusinessData = this.businessData;    
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
            let employeeYearCount = newBusinessData.employeeCountYear;
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
            createUpdateBusinessInput.Category = newBusinessData.category;
            createUpdateBusinessInput.SubCategory = newBusinessData.subCategory; 

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

    private async getEditBlogArticleAsync(articleId: number) {
        try {
            if (+this.selectedBlogArticleId > 0 && !this.isNew) {
                await this.http.get(API_URL.apiUrl.concat("/blog/get-article?articleId=" + articleId))
                    .subscribe({
                        next: (response: any) => {
                            console.log("Статья для изменения: ", response);
                            this.oEditArticle = response;
                            this.articleTitle = response.title;
                            this.shortArticleDescription = response.description;
                            this.articleDescription = response.text;
                            this.signature = response.signatureText;
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }            
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    public async onEditArticleAsync(selectedBlogId: number, selectedTheme: any, articleTitle: string, shortArticleDescription: string, articleDescription: string, signature: string) {
        try {
            let formData = new FormData();
            formData.append("previewFile", this.previewFile);
            formData.append("articleFile", this.articleFile);

            let articleInput = new ArticleInput();
            articleInput.Title = articleTitle;
            articleInput.BlogId = selectedBlogId;
            articleInput.ThemeCode = this.selectedTheme;
            articleInput.Description = shortArticleDescription;
            articleInput.Text = articleDescription;
            articleInput.SignatureText = signature;

            formData.append("articleData", JSON.stringify(articleInput));         

            await this.http.post(API_URL.apiUrl.concat("/blog/update-article"), formData)
                .subscribe({
                    next: (response: any) => {                        
                        console.log(response);
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

    // TODO: вынести в общий сервис.
    private async getBlogArticlesAsync(blogId: number) {
        try {
            let articleInput = new ArticleInput();
            articleInput.BlogId = blogId;

            await this.http.post(API_URL.apiUrl.concat("/blog/get-blog-articles"), articleInput)
                .subscribe({
                    next: (response: any) => {                        
                        console.log("aBlogArticles",response);
                        this.aBlogArticles = response;
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

    public async onCreateNewsAsync() {
        try {
            let newsInput = new NewsInput();
            let formData = new FormData();
            newsInput.Title = this.newsTitle;
            newsInput.Text = this.textNews;
            newsInput.Type = this.typeNews;

            formData.append("images", this.newsFile);
            formData.append("newsData", JSON.stringify(newsInput));

            await this.http.post(API_URL.apiUrl.concat("/blog/create-new"), formData)
                .subscribe({
                    next: (response: any) => {                        
                        console.log("Созданая новость",response);
                        this.oNews = response;
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

    private async getEditNewsAsync(newsId: number) {
        try {
            if (this.selectedNews > 0 && !this.isNew) {
                await this.http.get(API_URL.apiUrl.concat("/blog/get-new?newsId=" + newsId))
                    .subscribe({
                        next: (response: any) => {
                            console.log("Новость для изменения: ", response);
                            this.newsTitle = response.title;
                            this.typeNews = response.type;
                            this.textNews = response.text;
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }            
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    public async onEditNewsAsync() {

    };

    private async getNewsAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/blog/get-news"), {})
            .subscribe({
                next: (response: any) => {
                    console.log("Список новостей: ", response);
                    this.aNews = response;
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