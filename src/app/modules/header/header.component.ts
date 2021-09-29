import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonDataService } from 'src/app/services/common-data.service';
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderModule implements OnInit {
    aHeader: any[] = [];

    constructor(private http: HttpClient, 
        private commonService: CommonDataService,
        private titleService: Title,
        private router: Router) {
    }

    public async ngOnInit() {       
       await this.initHeaderAsync();

       this.titleService.setTitle("Gobizy: Войти");
    };

     /**
     * Функция получит поля хидера.
     */
    public async initHeaderAsync() {
        try {
            await this.commonService.initHeaderAsync("Main").then((data: any) => {
                this.aHeader = data;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция перехода на страницу авторизации.
     */
    public onRouteLogin() {        
        this.router.navigate(["/login"], { queryParams: { loginType: "code" } });
    };

    public onRouteStart() {
        this.router.navigate(["/"]);
    };
}
