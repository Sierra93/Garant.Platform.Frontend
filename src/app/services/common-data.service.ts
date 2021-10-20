import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "../core/core-urls/api-url";
import { BreadcrumbInput } from "../models/header/breadcrumb-input";
import { MainHeader } from "../models/header/main-header";
import { SuggestionInput } from "../models/suggestion/input/suggestion-input";

/**
 * Сервис общих функций.
 */
@Injectable()
export class CommonDataService {
    constructor(private http: HttpClient, private router: Router) {

    }

    // Функция отсчитывает время бездействия юзера, по окончании простоя убивает сессию и перенаправляет на стартовую для авторизации.
    public deadlineSession(): void {
        var idleTime = 0;

        $(document).ready(() => {
            //Increment the idle time counter every minute.
            var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

            //Zero the idle timer on mouse movement.
            $(this).mousemove(function (e) {
                idleTime = 0;
            });

            $(this).keypress(function (e) {
                idleTime = 0;
            });
        });

        const timerIncrement = () => {
            idleTime++;

            if (idleTime > 19) { // 20 minutes
                sessionStorage.clear();
                localStorage.clear();
                // $(".right-panel").show();
                this.router.navigate(["/login"]);
            }
        }
    };

    // Функция обновит токена пользователя.
    public async refreshToken(): Promise<void> {
        setInterval(async () => {
            if (!sessionStorage.token) {
                // clearInterval(intervalID);
                clearInterval();
                return;
            }

            try {
                await this.http.get(API_URL.apiUrl.concat("/user/token"))
                    .subscribe({
                        next: (response: any) => {
                            sessionStorage.token = response.token;
                            console.log("refresh token");
                        },

                        error: (err) => {
                            console.log(err);
                            console.log('Ошибка обновления токена');
                        }
                    });
            }

            catch (e: any) {
                throw new Error(e);
            }
        }, 530000); // Каждые 9 мин.
    };  

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

    /**
     * Функция получит список популярныз франшиз.
     * @returns Список франшиз.
     */
    public async GetPopularAsync() {
        try {
            return new Promise(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/franchise/main-popular"), {})
                    .subscribe({
                        next: (response: any) => {
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
     * Функция сформирует хлебные крошки страницы.
     * @returns - Список пунктов цепочки хлебных крошек.
     */
    public async GetBreadcrumbsAsync(selectorPage: string) {
        try {
            let inputBreadcrumb = new BreadcrumbInput();
            let param = "";

            if (selectorPage == "/franchise/create") {
                param = "create-franchise";
            }   
            
            inputBreadcrumb.SelectorPage = param;

            return new Promise(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/user/get-breadcrumbs"), inputBreadcrumb)
                    .subscribe({
                        next: (response: any) => {
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