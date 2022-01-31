import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { API_URL } from "src/app/core/core-urls/api-url";
import { ArticleInput } from "src/app/models/blog/article-input";
import { BlogInput } from "src/app/models/blog/blog-input";
import { CommonDataService } from "src/app/services/common/common-data.service";

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
    aBlogActions: any[] = [];
    aBlogThemes: any[] = [];
    selectedBlogCodeTheme: string = "";
    blogFile: any;
    blogTitle: string = "";
    aBlogs: any[] = [];
    selectedBlog: string = "";
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

    constructor(private http: HttpClient, 
        private messageService: MessageService,
        private commonService: CommonDataService) {
        
    };

    public async ngOnInit() {
        await this.loadMenuItemsAsync();        
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
            case 1:
                await this.loadBlogActions();
                await this.getBlogThemesAsync();
                await this.getBlogsAsync();
                await this.loadArticleThemesAsync();
                break;
        }
    };

    public async uploadFileBlogAsync(e: any) {
        console.log("uploadFileBlogAsync");
        this.blogFile = e.target.files[0];
        console.log("blogFile",this.blogFile);
    };

    public async uploadFilePreviewAsync(e: any) {
        console.log("uploadFilePreviewAsync");
        this.previewFile = e.target.files[0];
        console.log("previewFile",this.previewFile);
    };

    public async uploadFileArticleAsync(e: any) {
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

    public onSelectBlog(e: any) {
        console.log("onSelectBlog",e);
        this.selectedBlogId = e.value.blogId;
    };

    public onSelectThemeArticle(e: any) {
        console.log("onSelectThemeArticle",e);
        this.selectedTheme = e.value.themeCode;
        console.log("selectedTheme",this.selectedTheme);
    };
}