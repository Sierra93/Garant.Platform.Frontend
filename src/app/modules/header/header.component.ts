import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonDataService } from 'src/app/services/common/common-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import {header} from "./header";
import { SESSION_TOKEN } from "../../core/session/session.token";
import { SessionService } from "../../core/session/session.service";
import {filter, map, shareReplay, takeUntil} from "rxjs/operators";
import {GarDestroyService} from "../../gar-lib/gar-destroy.service";



const CABINET_LINKS: header.IHeaderItem[] = [
  { name: 'Продать', icon: 'cabinet-megaphone', link: '/' },
  { name: 'Мои сделки', icon: 'cabinet-deal', link: '/' },
  { name: 'Избранное', icon: 'cabinet-star', link: '/' },
  { name: 'Уведомления', icon: 'cabinet-bell', link: '/' },
]

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [GarDestroyService]
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
        }),
        shareReplay({refCount: true, bufferSize: 1}),
        takeUntil(this._destroy$)
    )

    aBreadcrumbs: any[] = [];
    routeParam: any;
    searchText: string = "";
    searchOptions: header.ISearchOption[];
    selectedSearchOption: header.ISearchOption;
    isGarant: boolean = false;
    items!: MenuItem[];
    isMenuHidden: boolean = true;
    categories: header.IHeaderItem[] = [
      { name: 'Главная', icon: 'category-home', link: '/' },
      { name: 'Франшизы', icon: 'category-franchise', link: '/catalog-franchise' },
      { name: 'Готовый бизнес', icon: 'category-business', link: '/catalog-business' },
      { name: 'Покупка через гарант', icon: 'category-deal', link: '/deal/start' },
      { name: 'Консалтинг', icon: 'category-consulting', link: '/consulting/start' },
      { name: 'Упаковка франшиз', icon: 'category-franchise-start', link: '/franchise/start' }
    ];

    readonly cabinetLinks$: Observable<header.IHeaderItem[]> = this._sessionService.isLogin$.pipe(
      map(isLogin => [...CABINET_LINKS, { name: isLogin ? 'Аккаунт' : 'Войти', icon: 'cabinet-profile', link: '/profile/my-data' }]),
      shareReplay({refCount: true, bufferSize: 1}),
      takeUntil(this._destroy$)
    );

    constructor(
        private http: HttpClient,
        private commonService: CommonDataService,
        private router: Router,
        private route: ActivatedRoute,
        @Inject(SESSION_TOKEN)
        private _sessionService: SessionService,
        private _destroy$: GarDestroyService
    ) {
          this.searchOptions = [
            { name: 'франшиза', type: 'franchise' },
            { name: 'бизнес', type: 'business' }
          ];

          this.selectedSearchOption = this.searchOptions[0];

          this.items = [
            {label: 'Подтверждение продажи'},
            {label: 'Согласование этапов сделки'},
            {label: 'Согласование договора'},
            {label: 'Оплата и исполнение этапов сделки'}
        ];

        this.routeParam = this.route.snapshot.queryParams;
    };

    ngDoCheck(){
      this.isGarant = window.location.href.includes("stage");

      if (this.isMenuHidden) {
        document.body.classList.remove('no-overflow');
      } else {
        document.body.classList.add('no-overflow');
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

    /**
     * Функция распределит роуты по пунктам хидера.
     * @param name - параметр роута с названием пункта.
     */
    // TODO refactor onGetMenuHeader method
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
        this.router.navigate(["/search"], { queryParams: { searchType: this.selectedSearchOption.type, searchText: searchText } });
    };
}
