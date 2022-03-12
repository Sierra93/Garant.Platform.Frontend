import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { API_URL } from 'src/app/core/core-urls/api-url';
import { RequestFranchiseInput } from 'src/app/models/request/input/request-franchise-input';
import { CommonDataService } from 'src/app/services/common/common-data.service';
import { DocumentService } from 'src/app/services/garant/document.service';

@Component({
  selector: 'view-franchise',
  templateUrl: './view-franchise.component.html',
  styleUrls: ['./view-franchise.component.scss'],
  providers: [ConfirmationService, MessageService],
})

/**
 * Класс модуля просмотра франшизы.
 */
export class ViewFranchiseModule implements OnInit {
    franchiseId: number = 0;
    franchiseData: any = [];
    routeParam: any;
    aInvestInclude: any[] = [];
    aFinIndicators: any[] = [];
    isHidePacks: boolean = false;
    aPacks: any = [];
    aFranchisePhotos: any[] = [];
    responsiveOptions: any;
    aNamesFranchisePhotos: any = [];
    fio: string = "";
    trainingDetails: string = "";
    userName: string = "";
    number: string = "";
    city: string = "";
    selectedValues: string[] = [];
    isHideIndicators: boolean = false;
  presentFile: any;

    constructor(private http: HttpClient,
        private commonService: CommonDataService,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService,
        private documentService: DocumentService) {
            this.routeParam = this.route.snapshot.queryParams;
            this.franchiseId = this.route.snapshot.queryParams.franchiseId;

            this.responsiveOptions = [
                {
                    breakpoint: '1024px',
                    numVisible: 5
                },
                {
                    breakpoint: '768px',
                    numVisible: 3
                },
                {
                    breakpoint: '560px',
                    numVisible: 1
                }
            ];
    };

    public async ngOnInit() {
        await this.getTransitionAsync();
    };

    private async getTransitionAsync() {
        try {
            let franchiseId = this.franchiseId;

            await this.commonService.getTransitionAsync(this.routeParam).then((data: any) => {
                console.log("Переход получен:", data);
                this.getViewFranchiseAsync(franchiseId);
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит данные франшизы, которую просматривают.
     * @returns - данные франшизы.
     */
    private async getViewFranchiseAsync(franchiseId: number) {
        try {
            console.log("getViewFranchiseAsync");

            await this.http.get(API_URL.apiUrl.concat("/franchise/get-franchise?franchiseId=" + franchiseId))
                .subscribe({
                    next: (response: any) => {
                        console.log("Полученная франшиза:", response);
                        this.franchiseData = response;
                        this.aNamesFranchisePhotos = this.franchiseData.url.split(",");
                        this.aInvestInclude = JSON.parse(response.investInclude);

                        let checkFinIndicators = JSON.parse(response.finIndicators);

                        // Если массив индикаторов не пустой.
                        if (Object.keys(checkFinIndicators).length > 0) {
                            this.aFinIndicators = checkFinIndicators;
                            this.isHideIndicators = true;
                        }

                        let checkPacks = JSON.parse(response.franchisePacks);

                        // Если массив пакетов не пустой.
                        if (Object.keys(checkPacks).length > 0) {
                            this.aPacks = checkPacks;
                            this.isHidePacks = true;
                        }

                        this.fio = response.fullName;

                        console.log("franchiseData", this.franchiseData);
                        console.log("aInvestInclude", this.aInvestInclude);
                        console.log("aFinIndicators", this.aFinIndicators);
                        console.log("aPacks", this.aPacks);
                        console.log("aNamesFranchisePhotos", this.aNamesFranchisePhotos);
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

    public async onRouteFranchiseChatAsync(franchiseId: number, type: string, userId: string) {
        await this.commonService.setTransitionAsync(franchiseId, type, userId, type).then((data: any) => {
            console.log("Переход записан:", data);
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**
   * Функция получит данные франшизы, которую просматривают.
   * @returns - данные франшизы.
   */
  private async getViewFranchiseAsync(franchiseId: number) {
    try {
      console.log('getViewFranchiseAsync');

      await this.http
        .get(
          API_URL.apiUrl.concat(
            '/franchise/get-franchise?franchiseId=' + franchiseId
          )
        )
        .subscribe({
          next: (response: any) => {
            console.log('Полученная франшиза:', response);
            this.franchiseData = response;
            this.aNamesFranchisePhotos = this.franchiseData.url.split(',');
            this.aInvestInclude = JSON.parse(response.investInclude);

            let checkFinIndicators = JSON.parse(response.finIndicators);

            // Если массив индикаторов не пустой.
            if (Object.keys(checkFinIndicators).length > 0) {
              this.aFinIndicators = checkFinIndicators;
              this.isHideIndicators = true;
            }

            let checkPacks = JSON.parse(response.franchisePacks);

            // Если массив пакетов не пустой.
            if (Object.keys(checkPacks).length > 0) {
              this.aPacks = checkPacks;
              this.isHidePacks = true;
            }

            this.fio = response.fullName;

            console.log('franchiseData', this.franchiseData);
            console.log('aInvestInclude', this.aInvestInclude);
            console.log('aFinIndicators', this.aFinIndicators);
            console.log('aPacks', this.aPacks);
            console.log('aNamesFranchisePhotos', this.aNamesFranchisePhotos);
          },

          error: (err) => {
            throw new Error(err);
          },
        });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public async onRouteFranchiseChatAsync(
    franchiseId: number,
    type: string,
    userId: string
  ) {
    await this.commonService
      .setTransitionAsync(franchiseId, type, userId, type)
      .then((data: any) => {
        console.log('Переход записан:', data);
      });

    // this.router.navigate(["/profile/chat/dialogs/dialog"], { queryParams: { dialogId: dialogId } });
    this.router.navigate(['/profile/chat/dialogs/dialog']);
  }

  /**
   * Функция создаст заявку франшизы.
   * @param userName Имя.
   * @param number Телефон.
   * @param city Город.
   * @param franchiseId Id франшизы.
   * @returns Данные заявки.
   */
  public async onCreateRequestFranchiseAsync(
    userName: string,
    number: string,
    city: string,
    franchiseId: number
  ) {
    try {
      console.log('getViewFranchiseAsync');
      let requestFranchiseInput = new RequestFranchiseInput();

      if (userName == '' || number == '' || city == '' || franchiseId <= 0) {
        return;
      }

      requestFranchiseInput.UserName = userName;
      requestFranchiseInput.Phone = number;
      requestFranchiseInput.City = city;
      requestFranchiseInput.FranchiseId = franchiseId;

      await this.http
        .post(
          API_URL.apiUrl.concat('/request/create-request-franchise'),
          requestFranchiseInput
        )
        .subscribe({
          next: (response: any) => {
            console.log('Заявка успешно создана', response);

            if (response.isSuccessCreatedRequest) {
              this.messageService.add({
                severity: 'success',
                summary: 'Успешно!',
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

  /**
   * Функция скачает файл.
   * @param fileName - Имя файла.
   */
  public async onDownloadFinModelFileAsync(fileName: string) {
    try {
      await this.documentService
        .downloadFileAsync(fileName)
        .then((data: any) => {});
    } catch (e: any) {
      throw new Error(e);
    }

  }

  private scrollPageToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  /**
   * Функция добавит файл презентации.
   */
  public uploadPresentAsync(event: any) {
    console.log("uploadPresentAsync");
    this.presentFile = event.target.files[0];
  };
}
