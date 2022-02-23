import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { API_URL } from "../../core/core-urls/api-url";
import { DialogInput } from "../../models/chat/input/dialog-input";
import { BreadcrumbInput } from "../../models/header/breadcrumb-input";
import { MainHeader } from "../../models/header/main-header";
import { SuggestionInput } from "../../models/suggestion/input/suggestion-input";
import { TransitionInput } from "../../models/transition/input/transition-input";
import { ready, type } from "jquery";
import { SESSION_TOKEN } from "../../core/session/session.token";
import { SessionService } from "../../core/session/session.service";
import { SessionItems } from "../../core/session/session-items";
import { header } from "../../modules/header/header";

/**
 * Сервис общих функций.
 */
@Injectable()
export class CommonDataService {
    currentRoute: any;

    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        @Inject(SESSION_TOKEN)
        private _sessionService: SessionService) {
            this.currentRoute = this.route.snapshot.queryParams;
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
                this._sessionService.removeDataItem(SessionItems.token);
                sessionStorage.clear();
                localStorage.clear();
                // $(".right-panel").show();
                this.router.navigate(["/login?loginType=code"]);
            }
        }
    };

    // Функция обновит токена пользователя.
    public async refreshToken(): Promise<void> {
        setInterval(async () => {
            if (!this._sessionService.getDataItem(SessionItems.token)) {
                // clearInterval(intervalID);
                clearInterval();
                return;
            }

            try {
                await this.http.get(API_URL.apiUrl.concat("/user/token"))
                    .subscribe({
                        next: (response: any) => {
                            const token = {[SessionItems.token]: response.token}
                            this._sessionService.setToken(token)
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
            return new Promise<header.IItem[]>(async resolve => {
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
            this._sessionService.removeDataItem(SessionItems.token);
            sessionStorage.clear();
            
            this.router.navigate(["/login"], { queryParams: { loginType: "code" } });
        }
    };

    /**
     * Функция получит поля футера.
     */
    public async initFooterAsync() {
        try {
            return new Promise(async resolve => {
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
            return new Promise(async resolve => {
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

            return new Promise(async resolve => {
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
    public async getPopularAsync() {
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
    public async getBreadcrumbsAsync(selectorPage: string) {
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

    /**
     * Функция запишет переход.
     * @param transitionType - тип перехода.
     * @param referenceId - Id франшизы или перехода.
     * @param otherId - Id другого пользователя.
     * @param typeItem - Тип предмета обсуждения.
     * @returns флаг успеха.
     */
    public async setTransitionAsync(referenceId: number, transitionType: string, otherId: string, typeItem: string) {
        try {
            let transitionInput = new TransitionInput();
            transitionInput.ReferenceId = referenceId;
            transitionInput.TransitionType = transitionType;
            transitionInput.OtherId = otherId;
            transitionInput.TypeItem = typeItem;

            return new Promise(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/user/set-transition"), transitionInput)
                    .subscribe({
                        next: (response: any) => {
                            resolve(response);
                        },

                        error: (err) => {
                            this.routeToStart(err);
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
     * Функция получит переход.
     * @returns Данные перехода.
     */
     public async getTransitionAsync(currentRoute: any) {
        try {                     
            return new Promise(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/user/get-transition"), {})
                    .subscribe({
                        next: (response: any) => {
                            resolve(response);
                        },

                        error: (err) => {
                            console.log("currentRoute", currentRoute);

                            if (currentRoute.mode !== "view") {
                                this.routeToStart(err);        
                                throw new Error(err);                       
                            }                          
                            
                           
                        }
                    });
            })
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит переход по параметрам.
     * @returns Данные перехода.
     */
     public async getTransitionWithParamsAsync(referenceId: number) {
        try {
            let transitionInput = new TransitionInput();
            transitionInput.ReferenceId = referenceId;

            return new Promise(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/user/get-transition-with-params"), transitionInput)
                    .subscribe({
                        next: (response: any) => {
                            resolve(response);
                        },

                        error: (err) => {
                            this.routeToStart(err);
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
     * Функция получит список категорий франшиз.
     * @returns Список категорий.
     */
    public async GetFranchiseCategoriesListAsync() {
        try {
            return new Promise(async resolve => {
                await this.http.get(API_URL.apiUrl.concat("/franchise/category-list"))
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
     * Функция получит список подкатеорий франшиз.
     * @returns Список подкатеорий.
     */
     public async GetFranchiseSubCategoriesListAsync(categoryCode: string, categorySysName: string) {
        try {
            return new Promise(async resolve => {
                await this.http.get(API_URL.apiUrl.concat("/franchise/subcategory-list?categoryCode=" 
                + categoryCode
                + "&categorySysName=" + categorySysName))
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
     * Функция получит список категорий бизнеса.
     * @returns Список категорий.
     */
      public async GetBusinessCategoriesListAsync() {
        try {
            return new Promise(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/business/category-list"), {})
                    .subscribe({
                        next: (response: any) => {
                            resolve(response);
                        },

                        error: (err) => {
                            this.routeToStart(err);
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
     * Функция получит список подкатегорий бизнеса.
     * @returns Список подкатегорий.
     */
      public async GetBusinessSubCategoriesListAsync() {
        try {
            return new Promise(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/business/subcategory-list"), {})
                    .subscribe({
                        next: (response: any) => {
                            resolve(response);
                        },

                        error: (err) => {
                            this.routeToStart(err);
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
     * Функция получит список городов бизнеса.
     * @returns Список городов.
     */
     public async GetBusinessCitiesListAsync() {
        try {
            return new Promise(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/business/cities-list"), {})
                    .subscribe({
                        next: (response: any) => {
                            resolve(response);
                        },

                        error: (err) => {
                            this.routeToStart(err);
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
     * Функция получит список меню для ЛК.
     * @returns Список меню.
     */
    public async getProfileMenuAsync() {
        try {
            return new Promise(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/user/profile-menu"), {})
                    .subscribe({
                        next: (response: any) => {
                            resolve(response);
                        },

                        error: (err) => {
                            this.routeToStart(err);
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
     * Функция получит список диалогов для текущего пользователя.
     * @returns Список диалогов.
     */
    public async getDialogsAsync() {
        try {
            return new Promise(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/chat/dialogs"), {})
                    .subscribe({
                        next: (response: any) => {
                            resolve(response);
                        },

                        error: (err) => {
                            this.routeToStart(err);
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
     * Функция получит список сообщений выбранного диалога.
     * @param dialogId - Id диалога.
     * @param typeItem - Тип предмета обсуждения.
     * @param ownerId - Id владельца/представителя..
     * @returns Список сообщений.
     */
      public async getDialogMessagesAsync(dialogId: number, typeItem: string, ownerId: string) {
        try {
            let dialogInput = new DialogInput();

            if (dialogId <= 0) {
                dialogId = this.route.snapshot.queryParams.dialogId;
            }

            dialogInput.DialogId = dialogId;
            dialogInput.TypeItem = typeItem;
            dialogInput.OwnerId = ownerId;

            return new Promise(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/chat/get-dialog"), dialogInput)
                    .subscribe({
                        next: (response: any) => {
                            resolve(response);
                        },

                        error: (err) => {
                            this.routeToStart(err);
                            throw new Error(err);
                        }
                    });
            })
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    public async onGetBlogsAsync() {
        try {                                                        
            return new Promise(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/blog/get-blogs"), {})
                    .subscribe({
                        next: (response: any) => {
                            resolve(response);
                        },

                        error: (err) => {
                            this.routeToStart(err);
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
     * Функция уберет пробелы в числе, которое в строке.
     * @param value - Входное значение в строке, у которого нужно убрать пробелы.
     * @returns - Число без пробелов.
     */
    public TrimSpaceInNumber(value: string) {
        return value.replace(/\s/g, "");
    }
};
