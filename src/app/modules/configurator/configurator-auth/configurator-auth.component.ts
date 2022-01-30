import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { ConfiguratorAuthInput } from "src/app/models/configurator/configurator-auth-input";

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

    constructor(private http: HttpClient, private router: Router) {

    };

    public async ngOnInit() {

    };

    /**
     * Функция авторизует сотрудника сервиса.
     * @param inputData - Данные для проверки. Email или телефон.
     * @param password - пароль.
     * @returns - Данные сотрудника.
     */
    public async onAuthAsync(inputData: string, password: string) {        
        try {                     
            let configuratorAuthInput = new ConfiguratorAuthInput();

            if (inputData !== "" && password !== "") {
                configuratorAuthInput.InputData = inputData;
                configuratorAuthInput.Password = password;
            }

            await this.http.post(API_URL.apiUrl.concat("/configurator/login"), configuratorAuthInput)
                .subscribe({
                    next: (response: any) => {                        
                        console.log("employee auth data:", response);

                        // Если у сотрудника есть доступ.
                        if (response.accessPanel == 1) {
                            this.router.navigate(["/configurator/admin"]);
                        }
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