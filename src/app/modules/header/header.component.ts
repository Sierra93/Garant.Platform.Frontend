import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonDataService } from 'src/app/services/common/common-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URL } from 'src/app/core/core-urls/api-url';
import { SearchInput } from 'src/app/models/search/input/search-input';

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
    isAuthenticated: boolean = false;
    searchText: string = "";
    selectedValueFranchise: boolean = false;
    selectedValueBusiness: boolean = false;
    searchType: string = "";
    searchOptions: string[];
    selectedSearchOption: string = "франшиза";

    constructor(private http: HttpClient,
        private commonService: CommonDataService,
        private router: Router,
        private route: ActivatedRoute) {
          this.searchOptions = ["франшиза", "бизнес"];
    };

    public async ngOnInit() {
        await this.initHeaderAsync();
        await this.commonService.refreshToken();
        await this.getBreadcrumbsAsync();
    };

    public async ngDoCheck() {
      this.checkAuthentication();
    }

     /**
     * Функция получит поля хидера.
     */
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

    public onRouteSearch(searchText: string) {
      let type = "";
      console.log(this.selectedSearchOption);

        if (this.selectedSearchOption == this.searchOptions[0]) {
            type = "franchise";
        }

        else if (this.selectedSearchOption == this.searchOptions[1]) {
            type = "business";
        }

        this.router.navigate(["/search"], { queryParams: { searchType: type, searchText: searchText } });
    };

  public checkAuthentication() {
      if (sessionStorage["token"] && sessionStorage["isSuccess"]) {
        this.isAuthenticated = true;
        return;
      }

      this.isAuthenticated = false;
    }
}
