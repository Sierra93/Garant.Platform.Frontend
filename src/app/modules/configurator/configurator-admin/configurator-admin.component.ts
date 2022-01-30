import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { API_URL } from "src/app/core/core-urls/api-url";
import { BlogInput } from "src/app/models/blog/blog-input";

@Component({
    selector: "configurator-admin",
    templateUrl: "./configurator-admin.component.html",
    styleUrls: ["./configurator-admin.component.scss"]
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

    constructor(private http: HttpClient) {
        this.aBlogActions = [
            {
                name: "Создать блог",
                value: "CreateBlog"
            }
        ];
    };

    public async ngOnInit() {
        await this.loadMenuItemsAsync();
        await this.getBlogThemesAsync();
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

    public onChangeTab(e: any) {
        console.log(e);
        this.tabIndex = e.index;
    };

    public async uploadFileBlogAsync(e: any) {
        console.log("uploadFileBlogAsync");
        this.blogFile = e.target.files[0];
        console.log("blogFile",this.blogFile);
    };

    public onSelectBlogTheme(e: any) {
        console.log(e);
        this.selectedBlogCodeTheme = e.themeCategoryCode;
    };
}