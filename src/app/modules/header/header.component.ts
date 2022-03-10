import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonDataService } from 'src/app/services/common/common-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { header } from "./header";
import { SESSION_TOKEN } from "../../core/session/session.token";
import { SessionService } from "../../core/session/session.service";
import { filter, map } from "rxjs/operators";

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

/**
 * Класс модуля хидера.
 */
export class HeaderModule implements OnInit {
    private _aHeader$ = new BehaviorSubject<header.IItem[] | null>(null);
    
    public aHeader$: Observable<header.IItem[] | null> = combineLatest([this._sessionService.isLogin$, this._aHeader$]).pipe(
        filter(([isLogin, aHeader]) => !!aHeader?.length),
        map(([isLogin, aHeader]) => {
            return !isLogin ? aHeader : aHeader!.filter(h => h.name !== 'Вход или регистрация')
        })
    )
    
    aBreadcrumbs: any[] = [];
    routeParam: any;
    searchText: string = "";
    selectedValueFranchise: boolean = false;
    selectedValueBusiness: boolean = false;
    searchType: string = "";
    searchOptions: string[];
    selectedSearchOption: string = "франшиза";
    isGarant: boolean = false;
    items!: MenuItem[];
    isSmallScreen: boolean = false;
    isMobile: boolean = false;
    isMenuHidden: boolean = true;
    tabletStart: boolean = false;

    constructor(
        private http: HttpClient,
        private commonService: CommonDataService,
        private router: Router,
        private route: ActivatedRoute,
        @Inject(SESSION_TOKEN)
        private _sessionService: SessionService
    ) {
          this.searchOptions = ["франшиза", "бизнес"];

          this.items = [
            {label: 'Подтверждение продажи'},
            {label: 'Согласование этапов сделки'},
            {label: 'Согласование договора'},
            {label: 'Оплата и исполнение этапов сделки'}
        ];

        this.routeParam = this.route.snapshot.queryParams;
    };

    ngDoCheck(){
      if (window.location.href.includes("stage")) {
        this.isGarant = true;
      } else {
        this.isGarant = false;
      }
    }

    public async ngOnInit() {
        await this.initHeaderAsync();
        await this.commonService.refreshToken();
        await this.getBreadcrumbsAsync();

        this.items = [
            {label: 'Step 1'},
            {label: 'Step 2'},
            {label: 'Step 3'}
        ];
    };

    @HostListener('window:resize', ['$event'])
    @HostListener('window:load', ['$event'])
    onResize() {
      if (window.innerWidth > 676 && window.innerWidth <= 1280) {
        this.isSmallScreen = true;
      } else if (window.innerWidth > 1280) {
        this.isSmallScreen = false;
      }

      if (window.innerWidth <= 676) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }

      if (window.innerWidth === 768) {
        this.tabletStart = true;
      } else {
        this.tabletStart = false;
      }
    }

    public toggleMenu(show: boolean): void {
      this.isMenuHidden = !show;
    }

    /**
    * Функция получит поля хидера.
    */
    private async initHeaderAsync() {
        try {
            await this.commonService.initHeaderAsync("Main").then((data: header.IItem[]) => {
                this._aHeader$.next(data)
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
}
