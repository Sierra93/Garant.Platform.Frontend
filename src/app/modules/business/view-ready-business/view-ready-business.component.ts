import {HttpClient} from '@angular/common/http';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {API_URL} from 'src/app/core/core-urls/api-url';
import {CreateUpdateBusinessInput} from 'src/app/models/business/input/business-create-update-input';
import {GetBusinessInput} from 'src/app/models/business/input/get-business-input';
import {RequestBusinessInput} from 'src/app/models/request/input/request-business-input';
import {CommonDataService} from 'src/app/services/common/common-data.service';
import {Observable, of} from "rxjs";

@Component({
  selector: 'view-ready-business',
  templateUrl: './view-ready-business.component.html',
  styleUrls: ['./view-ready-business.component.scss'],
  providers: [ConfirmationService, MessageService],
})

/**
 * Класс модуля просмотра бизнеса.
 */
export class ViewReadyBusinessModule implements OnInit {
  responsiveOptions: any;
  aNamesBusinessPhotos: any = [];
  lead: string = '';
  payback: number = 0;
  peculiarity: string = '';
  isGarant: boolean = false;
  activityDetail: string = '';
  defailsFranchise: string = '';
  priceIn: number = 0;
  nameIn = '';
  videoLink: string = '';
  modelFile: any;
  ind: number = 0;
  fio: string = '';
  aPriceIn: any;
  price: number = 0;
  turnPrice: number = 0;
  profitPrice: number = 0;
  profitability: number = 0;
  businessAge: number = 0;
  employeeYearCount: number = 0;
  form: string = '';
  share: number = 0;
  site: string = '';
  text: string = '';
  assets: string = '';
  filesAssetsFormData: any;
  reasonsSale: string = '';
  address: string = '';
  isHideVideo: boolean = false;
  businessName: string = '';
  activityPhotoName: any;
  filesAssets: any;
  filesReasonsSale: any;
  filesTextBusiness: any;
  filesBusiness: any;
  routeParam: any;
  businessId: number = 0;
  businessData: any = [];
  aBusinessPhotos: any = [];
  userName: string = '';
  number: string = '';
  isHidePeculiarity: boolean = false;
  isUrlVideo: boolean = false;

  public readonly listAdvantagesBusiness$: Observable<{title: string; description: string; result: string}[]> = of([{
    title: 'Стоимость',
    description: 'полная стоимость бизнеса',
    result: '2 400 000 ₽'
  }, {
    title: 'Оборот',
    description: 'средняя выручка',
    result: '400 000 ₽'
  }, {
    title: 'Прибыль',
    description: 'чистая прибыль за месяц',
    result: '205 000 ₽'
  }, {
    title: 'Окупаемость',
    description: 'планируемый срок',
    result: '10-12 месяцев'
  }, {
    title: 'Рентабельность',
    description: 'в процентах',
    result: '35%'
  }, {
    title: 'Возраст бизнеса',
    description: 'с момента основания',
    result: '4 года'
  }]);

  public readonly listAdvantagesCompany$: Observable<{title: string; description: string; result: string}[]> = of([{
    title: 'Сотрудников',
    description: 'компании',
    result: '15'
  }, {
    title: 'Форма',
    description: 'организационно-правовая',
    result: 'ООО'
  }, {
    title: 'Доля',
    description: 'к продаже',
    result: '100%'
  }, {
    title: 'Сайт',
    description: 'Сайт',
    result: 'Ссылка'
  }]);

  public readonly propertyBusiness$: Observable<{title: string; result: string}[]> = of([{
    title: 'Оборудование, мебель, оргтехника',
    result: '350 000 ₽'
  }, {
    title: 'Обучающий материал',
    result: '300 000 ₽'
  }, {
    title: 'Переуступка договора аренды',
    result: '120 000 ₽'
  }, {
    title: 'Клиентская база',
    result: '100 000 ₽'
  }, {
    title: 'Сайт',
    result: '35 000 ₽'
  }, {
    title: 'Фирма ООО',
    result: '150 000 ₽'
  }, {
    title: 'Итого',
    result: '4 685 000 ₽'
  }]);

  constructor(
    private http: HttpClient,
    private commonService: CommonDataService,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];

    // Первоначальная инициализация входит в стоимость.
    this.aPriceIn = [
      {
        Name: '',
        Price: '',
        isHide: false,
      },
    ];

    console.log('aPriceIn', this.aPriceIn);

    this.routeParam = this.route.snapshot.queryParams;
  }

  public async ngOnInit() {
    this.scrollPageToTop();
    await this.getUserFio();
    await this.getTransitionAsync();
  }

  public ngOnAfterViewInit() {
    this.aBusinessPhotos = this.aNamesBusinessPhotos;
    console.log('aBusinessPhotos', this.aBusinessPhotos);
  }

  // private updateComponent() {
  //   this.changeDetector.detectChanges()
  // }

  private async getTransitionAsync() {
    try {
      let businessId = 0;

      if (this.businessId <= 0 || this.businessId == undefined) {
        businessId = this.route.snapshot.queryParams.businessId;
      } else {
        businessId = this.businessId;
      }

      await this.commonService
        .getTransitionAsync(this.routeParam)
        .then((data: any) => {
          console.log('Переход получен:', data);
          this.getViewBusinessAsync(businessId);
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**
   * Функция получит данные бизнеса, которые нужно изменить.
   * @returns - данные бизнеса.
   */
  private async getViewBusinessAsync(businessId: number) {
    try {
      console.log('getViewBusinessAsync');
      let getBusinessInput = new GetBusinessInput();
      getBusinessInput.BusinessId = businessId;
      getBusinessInput.Mode = 'View';

      await this.http
        .post(
          API_URL.apiUrl.concat('/business/get-business'),
          getBusinessInput
        )
        .subscribe({
          next: (response: any) => {
            this.aPriceIn = JSON.parse(response.investPrice);

            // Запишет пути изображений бизнеса.
            // this.businessData.forEach((item: any) => {
            //     this.aNamesBusinessPhotos = item.urlsBusiness;
            // });

            this.aNamesBusinessPhotos = response.urlsBusiness.split(',');
            if (!this.businessData.peculiarity) {
              this.isHidePeculiarity = true;
            }
            if (!this.businessData.urlVideo) {
              this.isUrlVideo = true;
            }

            this.businessData = response

            console.log('BusinessData: ', this.businessData.price, this.businessData.turnPrice, this.businessData.profitPrice)
            console.log('Полученный бизнес:', response);
            console.log('businessData', this.businessData);
            console.log('aPriceIn', this.aPriceIn);
            console.log('aBusinessPhotos', this.aNamesBusinessPhotos);
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

  // TODO: доработать множественную загрузку файлов.
  public async uploadBusinessPhotosAsync(event: any) {
    try {
      let fileList = event.target.files[0];
      let files: File = fileList;
      let formData: FormData = new FormData();
      formData.append('files', files);

      await this.http
        .post(API_URL.apiUrl.concat('/business/temp-file'), formData)
        .subscribe({
          next: (response: any) => {
            console.log('Загруженные файлы бизнеса:', response);
            this.aNamesBusinessPhotos = response;
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

  /**
   * Функция изменит бизнес.
   * @returns - Данные бизнеса.
   */
  public async onEditBusinessAsync() {
    console.log('onEditBusinessAsync');

    try {
      let createUpdateBusinessInput = new CreateUpdateBusinessInput();
      let newBusinessData = this.businessData;
      let isGarant = newBusinessData.isGarant || false;
      let price = +newBusinessData.price;
      // let aPriceInData = JSON.parse(this.aPriceIn);
      let aNamesBusinessPhotos = this.aNamesBusinessPhotos;

      let {status: lead, payback, profitability, activityDetail, defailsFranchise, priceIn, urlVideo: videoLink, peculiarity, businessName, turnPrice, profitPrice, businessAge, employeeYearCount, form, share, site, text, assets, reasonsSale, address} = newBusinessData
      // Уберет флаги видимости.
      let newPriceInJson = this.aPriceIn.map((item: any) => ({
        Price: item.Price,
        Name: item.Name,
      }));

      let priceInJson = JSON.stringify(newPriceInJson);

      createUpdateBusinessInput.Status = lead;
      createUpdateBusinessInput.Payback = payback;
      createUpdateBusinessInput.ActivityDetail = activityDetail;
      createUpdateBusinessInput.Peculiarity = peculiarity;
      createUpdateBusinessInput.Text = defailsFranchise;
      createUpdateBusinessInput.UrlVideo = videoLink;
      createUpdateBusinessInput.IsGarant = isGarant;
      createUpdateBusinessInput.IsNew = false;
      createUpdateBusinessInput.BusinessName = businessName;
      createUpdateBusinessInput.Price = price;
      createUpdateBusinessInput.TurnPrice = turnPrice;
      createUpdateBusinessInput.ProfitPrice = profitPrice;
      createUpdateBusinessInput.Profitability = profitability;
      createUpdateBusinessInput.BusinessAge = businessAge;
      createUpdateBusinessInput.EmployeeCountYear = employeeYearCount;
      createUpdateBusinessInput.Form = form;
      createUpdateBusinessInput.Share = share;
      createUpdateBusinessInput.Site = site;
      createUpdateBusinessInput.Text = text;
      createUpdateBusinessInput.Assets = assets;
      createUpdateBusinessInput.ReasonsSale = reasonsSale;
      createUpdateBusinessInput.Address = address;
      createUpdateBusinessInput.InvestPrice = priceInJson;
      createUpdateBusinessInput.UrlsBusiness = aNamesBusinessPhotos;

      // TODO: заменить на динамическое определение категории франшизы.
      createUpdateBusinessInput.Category = 'Тестовая категория';

      // TODO: заменить на динамическое определение категории франшизы.
      createUpdateBusinessInput.SubCategory = 'Тестовая подкатегория';

      let sendFormData = new FormData();
      sendFormData.append(
        'businessDataInput',
        JSON.stringify(createUpdateBusinessInput)
      );
      sendFormData.append('filesAssets', this.filesAssets);
      sendFormData.append('filesReasonsSale', this.filesReasonsSale);
      sendFormData.append('finModelFile', this.modelFile);
      sendFormData.append('filesTextBusiness', this.filesTextBusiness);

      await this.http
        .post(
          API_URL.apiUrl.concat('/business/create-update-business'),
          sendFormData
        )
        .subscribe({
          next: (response: any) => {
            console.log('Бизнес успешно изменен:', response);
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

  /**
   * Функция добавит файл активов бизнеса.
   */
  public uploadAssetsBusinessPhotosAsync(event: any) {
    console.log('uploadAssetsBusinessPhotosAsync');
    this.filesAssets = event.target.files[0];
  }

  /**
   * Функция добавит файл причин продажи бизнеса.
   */
  public uploadReasonsSalePhotosAsync(event: any) {
    console.log('uploadReasonsSalePhotosAsync');
    this.filesReasonsSale = event.target.files[0];
  }

  /**
   * Функция добавит файл фин.модели.
   */
  public uploadFinModelAsync(event: any) {
    console.log('uploadFinModelAsync');
    this.modelFile = event.target.files[0];
  }

  /**
   * Функция добавит файл деятельности бизнеса.
   */
  public uploadTextBusinessPhotosAsync(event: any) {
    console.log('uploadTextBusinessPhotosAsync');
    this.filesTextBusiness = event.target.files[0];
  }

  /**
   * Функция нарастит блоки с данными входит в стоимость.
   * @param priceIn - цена.
   * @param nameIn - название.
   */
  public onAddPriceIn(priceIn: any, nameIn: any) {
    if (this.aPriceIn.length == 1) {
      this.aPriceIn[0] = {
        Name: nameIn,
        Price: priceIn,
      };

      this.aPriceIn.push({
        Name: '',
        Price: '',
      });

      this.aPriceIn[this.ind].isHide = true;
      this.ind++;

      return;
    }

    this.aPriceIn[this.ind].Name = nameIn;
    this.aPriceIn[this.ind].Price = priceIn;

    this.aPriceIn.push({
      Name: '',
      Price: '',
    });

    this.aPriceIn[this.ind].isHide = true;
    this.ind++;

    console.log('aPriceIn', this.aPriceIn);
  }

  public onCheckedGarant() {
    console.log('isGarant', this.isGarant);
  }

  private async getUserFio() {
    try {
      await this.http
        .post(API_URL.apiUrl.concat('/user/user-fio'), {})
        .subscribe({
          next: (response: any) => {
            console.log('fio data:', response);
            this.fio = response.fullName;
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

  /**
   * Функция создаст заявку бизнеса.
   * @param userName Имя.
   * @param number Телефон.
   * @param businessId Id бизнеса.
   * @returns Данные заявки.
   */
  public async onCreateRequestBusinessAsync(
    userName: string,
    number: string,
    businessId: number
  ) {
    try {
      console.log('onCreateRequestBusinessAsync');
      let requestBusinessInput = new RequestBusinessInput();

      if (userName == '' || number == '' || businessId <= 0) {
        return;
      }

      requestBusinessInput.UserName = userName;
      requestBusinessInput.Phone = number;
      requestBusinessInput.BusinessId = businessId;

      await this.http
        .post(
          API_URL.apiUrl.concat('/request/create-request-business'),
          requestBusinessInput
        )
        .subscribe({
          next: (response: any) => {
            console.log('Статус создания заявки: ', response);

            if (response.isSuccessCreatedRequest) {
              this.messageService.add({
                severity: 'success',
                summary: 'Успешно',
                detail: response.statusText,
              });
            }
          },

          error: (err) => {
            throw new Error(err);
          },
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  private scrollPageToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
