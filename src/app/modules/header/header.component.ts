import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonDataService } from 'src/app/services/common-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

/** 
 * Класс модуля хидера.
 */
export class HeaderModule implements OnInit {
    aHeader: any[] = [];
    aBreadcrumbs: any[] = [];
    routeParam: any;

    constructor(private http: HttpClient, 
        private commonService: CommonDataService,        
        private router: Router,
        private route: ActivatedRoute) {
    };

    public async ngOnInit() {
        await this.initHeaderAsync();
        await this.commonService.refreshToken();
        await this.getBreadcrumbsAsync();
    };

     /**
     * Функция получит поля хидера.
     */
    private async initHeaderAsync() {
        try {
            await this.commonService.initHeaderAsync("Main").then((data: any) => {
                this.aHeader = data;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    public onRouteStart() {
        this.router.navigate(["/"]);
    };

    /**
     * Функция распределит роуты по пунктам хидера.
     * @param name - параметр роута с названием пункта.
     */
    public onGetMenuHeader(name: string) {
        switch (name) {
            case "Вход или регистрация":
                this.router.navigate(["/login"], { queryParams: { loginType: "code" } });
                break;

            // Переход к созданию объявления.
            case "Разместить объявление":
                this.router.navigate(["/ad/create"]);
                break;
        }
    };

    public onRouteCatalogFranchise() {
        this.router.navigate(["/catalog-franchise"]);
    };

     /**
     * Функция сформирует хлебные крошки страницы.
     * @returns - Список пунктов цепочки хлебных крошек.
     */
    private async getBreadcrumbsAsync() {
        try {
            await this.commonService.getBreadcrumbsAsync(this.router.url).then((data: any) => {
                console.log("breadcrumbs", data);
                this.aBreadcrumbs = data;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    public onRouteProfile() {
        this.router.navigate(["/profile"]);
    };
}
