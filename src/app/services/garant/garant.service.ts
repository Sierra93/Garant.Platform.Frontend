import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GarantInitInput } from "src/app/models/garant/input/garant-init-input";
import { TransitionInput } from "src/app/models/transition/input/transition-input";
import { API_URL } from "../../core/core-urls/api-url";
import { CommonDataService } from "../common/common-data.service";

/**
 * Сервис Гаранта.
 */
@Injectable()
export class GarantService {
    constructor(private http: HttpClient, 
        private router: Router,
        private route: ActivatedRoute,
        private commonService: CommonDataService) {

    }

   /**
     * Функция получит данные Гаранта на ините.
     * @param stage - Номер этапа.
     * @param isChat - Флаг чата.
     * @param otherId - Id другого пользователя.
     * @returns Данные инита страницы.
     */
    public async initGarantDataAsync(stage: number, isChat: boolean, otherId: string) {
        try {
            let garantInput = new GarantInitInput();

            // TODO: позже убрать хардкод!
            garantInput.OriginalId = 1000005;
            garantInput.OrderType = "Franchise";
            garantInput.Stage = stage;
            garantInput.IsChat = isChat;
            garantInput.OtherId = otherId;

            return new Promise(async resolve => {
                await this.http.post(API_URL.apiUrl.concat("/garant/init"), garantInput)
                    .subscribe({
                        next: (response: any) => {
                            resolve(response);
                        },

                        error: (err) => {
                            this.commonService.routeToStart(err);
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
                            this.commonService.routeToStart(err);
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
     * Функция проверяет, оплачен ли заказ.
     */
    public async checkPaymentStateAsync(orderId: number) {
        setInterval(async () => {
            try {                
                return new Promise<boolean>(async resolve => {
                    await this.http.post(API_URL.apiUrl.concat("/garant/get-state-payment"), {})
                        .subscribe({
                            next: (response: any) => {
                                resolve(response);
                            },

                            error: (err) => {
                                this.commonService.routeToStart(err);
                                throw new Error(err);
                            }
                        });
                })
            }

            catch (e: any) {
                throw new Error(e);
            }
        }, 5000); // Каждые 5 миллисек.
    };  
};