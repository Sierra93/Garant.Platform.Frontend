import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CheckCodeInput } from "src/app/models/login/input/check-code-input";
import { LoginInput } from "src/app/models/login/input/login-input";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})

/** 
 * Класс модуля авторизации.
 */
export class LoginModule implements OnInit {
    routeParam: number;
    isCode: boolean = false;
    isAuth: boolean = false;
    isPass: boolean = false;
    isGetCode: boolean = false;
    data: string = "";
    numOrEmail: string = "";
    pass: string = "";
    isHideBtnGetCode: boolean = false;
    code: string = "";
    type: string = "";
    time: number = 60;
    interval: any;
    play: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private titleService: Title) {
        this.routeParam = this.route.snapshot.queryParams.loginType;

        // Если вход по коду.
        if (this.route.snapshot.queryParams.loginType == "code") {
            this.isCode = true;
            this.isAuth = false;
            this.isPass = false;
        }

        // Если есть аккаунт.
        else if (this.route.snapshot.queryParams.loginType == "auth") {
            this.isAuth = true;
            this.isCode = false;
            this.isPass = false;
        }

        // Если вход по паролю.
        else if (this.route.snapshot.queryParams.loginType == "pass") {
            this.isAuth = false;
            this.isCode = false;
            this.isPass = true;
        }
    };

    public ngOnInit() {
        this.titleService.setTitle("Gobizy: Войти");
    };

    /**
     * Функция входа по аккаунту.
     */
    public onLoginByAccount() {
        this.isAuth = true;
        this.isCode = false;
        this.router.navigate(["/login"], { queryParams: { loginType: "auth" } });
    };

    /**
    * Функция входа по паролю.
    */
    public onLoginByPass() {
        this.isAuth = false;
        this.isCode = false;
        this.isPass = true;
        this.router.navigate(["/login"], { queryParams: { loginType: "pass" } });
    };

    /**
     * Функция авторизует пользователя.
     */
    public async onLoginAsync(getByPassForm: NgForm) {
        try {
            let loginInput = new LoginInput();
            loginInput.email = getByPassForm.value.numOrEmail;
            loginInput.password = getByPassForm.value.pass;

            await this.http.post(API_URL.apiUrl.concat("/user/login"), loginInput)
                .subscribe({
                    next: (response: any) => {
                        console.log("Авторизация:", response);                        

                        if (response.token && response.isSuccess) {
                            sessionStorage["token"] = response.token;
                            sessionStorage["user"] = response.user;
                            sessionStorage["isSuccess"] = response.isSuccess;
                            this.isGetCode = true;
    
                            this.router.navigate(["/"]);
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

    /**
     * Функция получит код подтверждения.
     */
    public async onGetCodeAsync(form: NgForm) {
        console.log("data", form.value.data);
        this.startTimer();

        try {
            let inputData = new CheckCodeInput();
            inputData.data = form.value.data;

            await this.http.post(API_URL.apiUrl.concat("/mailing/send-confirm-code"), inputData)
                .subscribe({
                    next: (response: any) => {
                        console.log("Код подтверждения:", response);

                        if (response.isSuccessMailing) {
                            this.isGetCode = true;
                            this.isHideBtnGetCode = true;
                            this.type = response.typeMailing;
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

    /**
     * Функция проверит код подтверждения.
     */
    public async onCheckCodeAsync(form: NgForm) {
        try {
            let checkCodeInput = new CheckCodeInput();
            checkCodeInput.code = form.value.code;

            await this.http.post(API_URL.apiUrl.concat("/user/check-code"), checkCodeInput)
                .subscribe({
                    next: (response: any) => {
                        console.log("Проверка кода подтверждения:", response);
                        this.isGetCode = true;

                        if (response.token && response.isSuccess) {
                            sessionStorage["token"] = response.token;
                            sessionStorage["user"] = response.user;
                            sessionStorage["isSuccess"] = response.isSuccess;

                            this.pauseTimer();
                            // this.router.navigate(["/profile-data"]);
                            this.router.navigate(["/"]);
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

    public startTimer() {
        this.play = true;
        this.interval = setInterval(() => {
            if (this.time == 0) {
                this.pauseTimer();
                return;
            }

            this.time--;
        }, 1000)
    };

    public pauseTimer() {
        this.play = false;
        clearInterval(this.interval);
    };
}