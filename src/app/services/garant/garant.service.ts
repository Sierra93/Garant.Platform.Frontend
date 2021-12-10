import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GarantInitInput } from "src/app/models/garant/input/garant-init-input";
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
     * @returns Данные инита страницы.
     */
    public async initGarantDataAsync() {
        try {
            let garantInput = new GarantInitInput();

            // TODO: позже убрать хардкод!
            garantInput.OriginalId = 1000005;
            garantInput.OrderType = "Franchise";

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
};