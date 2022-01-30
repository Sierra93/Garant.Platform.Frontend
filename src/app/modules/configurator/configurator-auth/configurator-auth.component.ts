import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ErrorObserver } from "rxjs";
import { API_URL } from "src/app/core/core-urls/api-url";

@Component({
    selector: "configurator-auth",
    templateUrl: "./configurator-auth.component.html",
    styleUrls: ["./configurator-auth.component.scss"]
})

/** 
 * Класс модуля конфигуратора (авторизация).
 */
export class ConfiguratorAuthModule implements OnInit {
    inputData: string = "";
    password: string = "";

    constructor(private http: HttpClient) {

    };

    public async ngOnInit() {

    };

    public async onAuthAsync(inputData: string, password: string) {
        console.log("inputData ",inputData, " password",password);

        try {                     
            await this.http.post(API_URL.apiUrl.concat("/configurator/login"), {
                "InputData": inputData,
                "Password": password
            })
                .subscribe({
                    next: (response: any) => {                        
                        console.log("employee auth status:", response);
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