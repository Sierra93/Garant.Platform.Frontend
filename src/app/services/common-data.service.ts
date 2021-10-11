import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "../core/core-urls/api-url";
import { MainHeader } from "../models/header/main-header";
import { SuggestionInput } from "../models/suggestion/input/suggestion-input";

/**
 * Сервис общих функций.
 */
@Injectable()
export class CommonDataService {
    constructor(private http: HttpClient, private router: Router) {

    }

    /**
     * Функция получит поля хидера.
     * @param type - тип хидера.
     */
    public async initHeaderAsync(type: string) {
        let mainPage = new MainHeader();
        mainPage.Type = type;

        try {
            return new Promise<string>(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/user/init-header"), mainPage)
                    .subscribe({
                        next: (response: any) => {
                            console.log("Данные хидера:", response);
                            resolve(response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            })
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    public routeToStart(err: any) {
        if (err.status === 401) {
            sessionStorage.clear();
            sessionStorage["role"] = "G";

            this.router.navigate(["/login"]);
        }
    };

    /**
     * Функция получит поля футера.
     */
    public async initFooterAsync() {
        try {
            return new Promise<string>(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/user/init-footer"), {})
                    .subscribe({
                        next: (response: any) => {
                            console.log("Данные футера:", response);
                            resolve(response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            })
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит список категорий.
     * @returns Список категорий.
     */
    public async loadCategoriesListAsync() {
        try {
            return new Promise<string>(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/main/categories-list"), {})
                    .subscribe({
                        next: (response: any) => {
                            console.log("Список категорий:", response);
                            resolve(response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            })
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

     /**
     * Функция получит одно предложение с флагом IsSingle.
     * @returns данные предложения.
     */
    public async loadSingleSuggestionAsync() {
        try {
            let suggestionInput = new SuggestionInput();
            suggestionInput.isSingle = true;
            suggestionInput.isAll = false;

            return new Promise<string>(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/user/single-suggestion"), suggestionInput)
                    .subscribe({
                        next: (response: any) => {
                            console.log("Предложения:", response);
                            resolve(response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            })
        }

        catch (e: any) {
            throw new Error(e);
        }
    };
};