import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { API_URL } from "src/app/core/core-urls/api-url";
import { GarantInitInput } from "src/app/models/garant/input/garant-init-input";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "garant-init",
    templateUrl: "./garant-init.component.html",
    styleUrls: ["./garant-init.component.scss"]
})

/** 
 * Класс модуля Гаранта (страница инита 1 этап).
 */
export class GarantInitModule implements OnInit {    
    oInitData: any = {};

    constructor(private http: HttpClient, private commonService: CommonDataService) {

    };

    public async ngOnInit() {
        await this.initGarantData();
    };    

    /**
     * Функция получит данные Гаранта на ините.
     * @returns Данные инита страницы.
     */
    private async initGarantData() {
        try {
            let garantInput = new GarantInitInput();
            garantInput.OriginalId = 1000005;
            garantInput.OrderType = "Franchise";

            await this.http.post(API_URL.apiUrl.concat("/garant/init"), garantInput)
                .subscribe({
                    next: (response: any) => {
                        this.oInitData = response;
                        console.log("garant init data: ", this.oInitData);
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