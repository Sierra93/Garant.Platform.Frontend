import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URL } from 'src/app/core/core-urls/api-url';
import { FilterBusinessWithPaginationInput } from 'src/app/models/business/input/filter-business-with-pagination-input';
import { PaginationInput } from 'src/app/models/pagination/input/pagination-input';
import { CommonDataService } from 'src/app/services/common/common-data.service';


@Component({
    selector: "catalog-business",
    templateUrl: "./catalog-business.component.html",
    styleUrls: ["./catalog-business.component.scss"]
})

/**
 * Класс модуля каталога бизнеса.
 */
export class CatalogBusinessModule implements OnInit {
  aPopularBusiness: any[] = [];
  isGarant: boolean = false;
  aCities: any[] = [];
  aBusinessCategories: any[] = [];
  aViewBusiness: any[] = [];
  minPrice!: number;
  maxPrice!: number;
  minProfit!: number;
  maxProfit!: number;
  view: string = '';
  city: string = '';
  category: string = '';
  selectedCity: string = '';
  selectedCategory: any = '';
  selectedViewBusiness: any;
  aBusinessList: any[] = [];
  selectedSort: any = '';
  aSortPrices: any[] = [];
  filterMinPrice!: number;
  filterMaxPrice!: number;
  countTotalPage!: number;
  countBusinesses!: number;
  aRowsPerPageOptions: number[] = [10, 20, 30];
  selectedCountRows: number = 10;
  aBlogs: any[] = [];
  aNews: any[] = [];
  categoryList1: any[] = [];
  categoryList2: any[] = [];
  categoryList3: any[] = [];
  categoryList4: any[] = [];
  aDataActions: any[] = [];
  oTopAction: any = {};
  oSuggestion: any = {};
  aNewFranchises: any[] = [];
  responsiveOptions: any[] = [];
  aReviewsFranchises: any[] = [];
  businessId: number = 0;
  routeParam: number;
  isHideBusinessWithGarant: boolean = true;
  filterRang: number[] = [20, 80];
  rangValue: number[] = [20, 80];

  constructor(
    private http: HttpClient,
    private commonService: CommonDataService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.aSortPrices = [
      {
        name: 'По убыванию цены',
        value: 'Desc',
      },
      {
        name: 'По возрастанию цены',
        value: 'Asc',
      },
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.routeParam = this.route.snapshot.queryParams.businessId;
  }

  public async ngOnInit() {
    await this.getPopularBusinessAsync();
    await this.GetBusinessListAsync();
    await this.loadCitiesFranchisesListAsync();
    await this.loadCategoriesFranchisesListAsync();
    await this.loadViewBusinessFranchisesListAsync();
    await this.loadPaginationInitAsync();
    await this.GetActionsAsync();
    await this.GetBlogsAsync();
    await this.GetNewsTopAsync();
    await this.loadCategoriesListAsync();
    await this.loadSingleSuggestionAsync();
    await this.GetNewFranchisesListAsync();
    // await this.GetReviewsFranchisesAsync();
  }

  /**
   * Функция получит список популярного бизнеса.
   * @returns Список бизнеса.
   */
  private async getPopularBusinessAsync() {
    try {
      await this.commonService.getPopularBusinessAsync().then((data: any) => {
        console.log('Популярный бизнес:', data);
        this.aPopularBusiness = data;
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список бизнеса.
   */
  private async GetBusinessListAsync() {
    try {
      //TODO: Возможно не используется
      await this.http
        .post(API_URL.apiUrl.concat('/business/catalog-business'), {})
        .subscribe({
          next: (response: any) => {
            console.log('Список бизнеса:', response);
            this.aBusinessList = response;
          },

          error: (err) => {
            throw new Error(err);
          },
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список городов бизнеса.
   */
  private async loadCitiesFranchisesListAsync() {
    try {
      await this.http
        .post(API_URL.apiUrl.concat('/business/cities-list'), {})
        .subscribe({
          next: (response: any) => {
            console.log('Список городов:', response);
            this.aCities = response;
          },

          error: (err) => {
            throw new Error(err);
          },
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список категорий бизнеса.
   */
  private async loadCategoriesFranchisesListAsync() {
    try {
      await this.http
        .post(API_URL.apiUrl.concat('/business/category-list'), {})
        .subscribe({
          next: (response: any) => {
            console.log('Список категорий бизнеса:', response);
            this.aBusinessCategories = response;
          },

          error: (err) => {
            throw new Error(err);
          },
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список видов бизнеса.
   */
  private async loadViewBusinessFranchisesListAsync() {
    try {
      await this.http
        .post(API_URL.apiUrl.concat('/main/business-list'), {})
        .subscribe({
          next: (response: any) => {
            console.log('Список видов бизнеса:', response);
            this.aViewBusiness = response;
          },

          error: (err) => {
            throw new Error(err);
          },
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public async onPaginationChangeAsync(event: any) {
    try {
      let filterInput = new FilterBusinessWithPaginationInput();
      filterInput.TypeSortPrice = this.selectedSort.value;
      filterInput.MinProfit = this.minProfit;
      filterInput.MaxProfit = this.maxProfit;
      filterInput.City = this.city;
      filterInput.CategoryCode = this.selectedCategory.categoryCode;
      filterInput.MinPrice = this.minPrice;
      filterInput.MaxPrice = this.maxPrice;
      filterInput.IsGarant = this.isGarant;
      filterInput.PageNumber = event.page + 1;
      filterInput.CountRows = event.rows;

      this.selectedCountRows = event.rows;
      await this.http
        .post(API_URL.apiUrl.concat('/business/filter-pagination'), filterInput)
        .subscribe({
          next: (response: any) => {
            this.aBusinessList = response.results;
            this.countBusinesses = response.countAll;
            this.countTotalPage = response.countAll;
          },
          error: (err) => {
            this.commonService.routeToStart(err);
            throw new Error(err);
          },
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

    private async loadPaginationInitAsync() {
        let paginationData = new PaginationInput();

        // TODO: доработать на динамическое получение из роута или как-нибудь еще, чтобы помнить, что выбирал пользователь.
        paginationData.PageNumber = 1;

    try {
      await this.http
        .post(
          API_URL.apiUrl.concat('/pagination/init-catalog-business'),
          paginationData
        )
        .subscribe({
          next: (response: any) => {
            console.log('pagination init', response);
            this.countBusinesses = response.countAll;
            this.aBusinessList = response.results;
            this.countTotalPage = response.countAll;
          },

          error: (err) => {
            this.commonService.routeToStart(err);
            throw new Error(err);
          },
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public async onChangeSortPrice() {
    console.log('onChangeSortPrice', this.selectedSort);
  }

  /**
   * Функция фильтрует бизнесы по параметрам с учётом пагинации.
   * @returns - Список бизнесов после фильтрации с учётом пагинации.
   */
  public async onFilterBusinessesWithPaginationAsync() {
    try {
      let filterInput = new FilterBusinessWithPaginationInput();
      filterInput.TypeSortPrice = this.selectedSort.value;
      filterInput.MinProfit = this.minProfit;
      filterInput.MaxProfit = this.maxProfit;
      filterInput.City = this.city;
      filterInput.CategoryCode = this.selectedCategory.categoryCode;
      filterInput.MinPrice = this.minPrice;
      filterInput.MaxPrice = this.maxPrice;
      filterInput.IsGarant = this.isGarant;
      filterInput.PageNumber = 1;
      filterInput.CountRows = this.selectedCountRows;

      await this.http
        .post(API_URL.apiUrl.concat('/business/filter-pagination'), filterInput)
        .subscribe({
          next: (response: any) => {
            console.log('Бизнеса после фильтрации:', response);
            this.aBusinessList = response.results;
            this.countBusinesses = response.countAll;
            this.countTotalPage = response.countAll;
          },

          error: (err) => {
            this.commonService.routeToStart(err);
            throw new Error(err);
          },
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public async onClearFilters() {
    //TODO: После сброса числовые значения устанавливаются в ноль: нужно выводить плейсхолдеры вместо нулей
    //и запретить пользователю отправлять "пустые" значения цен и прибыли. Этого можно добиться, если сначала ввести
    // а затем руками стереть значение.

    this.isGarant = true;
    this.selectedCategory = '';
    this.selectedSort = '';
    this.selectedCity = '';
    this.maxPrice = 0;
    this.minPrice = 0;
    this.minProfit = 0;
    this.maxProfit = 0;

    await this.loadPaginationInitAsync();
  }

    /**
     * Функция получит данные для блока событий.
     */
     private async GetActionsAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/main/actions"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Блок событий:", response);
                        this.aDataActions = response.filter((el: any) => el.isTop == false);

            // this.oTopAction = this.aDataActions.filter(el => el.isTop == true)[0];
            // console.log("oTopAction",this.oTopAction);
          },

          error: (err) => {
            throw new Error(err);
          },
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**
   * Функция получит список блогов.
   * @returns Список блогов.
   */
  private async GetBlogsAsync() {
    try {
      await this.http
        .post(API_URL.apiUrl.concat('/blog/main-blogs'), {})
        .subscribe({
          next: (response: any) => {
            console.log('Список блогов:', response);
            this.aBlogs = response;
          },

          error: (err) => {
            throw new Error(err);
          },
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**
   * Функция получит список проплаченных новостей.
   * @returns Список новостей.
   */
  private async GetNewsTopAsync() {
    try {
      await this.http
        .post(API_URL.apiUrl.concat('/blog/get-news'), {})
        .subscribe({
          next: (response: any) => {
            console.log('Список новостей:', response);
            this.aNews = response;
          },

          error: (err) => {
            throw new Error(err);
          },
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**
   * Функция получит список категорий.
   * @returns Список категорий.
   */
  private async loadCategoriesListAsync() {
    try {
      await this.commonService.loadCategoriesListAsync().then((data: any) => {
        this.categoryList1 = data.resultCol1;
        this.categoryList2 = data.resultCol2;
        this.categoryList3 = data.resultCol3;
        this.categoryList4 = data.resultCol4;
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**
   * Функция получит одно предложение с флагом IsSingle.
   * @returns данные предложения.
   */
  private async loadSingleSuggestionAsync() {
    try {
      await this.commonService.loadSingleSuggestionAsync().then((data: any) => {
        this.oSuggestion = data;
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**
   * Функция получит список новых франшиз.
   * @returns Список франшиз.
   */
  private async GetNewFranchisesListAsync() {
    try {
      await this.http
        .post(API_URL.apiUrl.concat('/franchise/new-franchise'), {})
        .subscribe({
          next: (response: any) => {
            console.log('Список новых франшиз:', response);
            this.aNewFranchises = response;
          },

          error: (err) => {
            throw new Error(err);
          },
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  // private async GetReviewsFranchisesAsync() {
  //     try {
  //         await this.http.post(API_URL.apiUrl.concat("/franchise/review"), {})
  //             .subscribe({
  //                 next: (response: any) => {
  //                     console.log("Отзывы:", response);
  //                     this.aReviewsFranchises = response;
  //                 },

  //                 error: (err) => {
  //                     throw new Error(err);
  //                 }
  //             });
  //     }

  //     catch (e: any) {
  //         throw new Error(e);
  //     }
  // };

  /**
   * Функция запишет переход.
   */
  private async setTransitionAsync(businessId: number) {
    try {
      await this.commonService
        .setTransitionAsync(businessId, 'Business', '', '')
        .then((data: any) => {
          console.log('Переход записан:', data);
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**
   * Функция перейдет к просмотру карточки бизнеса.
   */
  public async routeViewFranchiseCardAsync(businessId: number) {
    await this.setTransitionAsync(businessId);
    this.router.navigate(['/business/view'], {
      queryParams: { businessId: businessId },
    });
  }
}
