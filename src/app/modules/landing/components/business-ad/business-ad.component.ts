import { Component, OnInit, DoCheck, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/core/core-urls/api-url';

@Component({
  selector: 'app-business-ad',
  templateUrl: './business-ad.component.html',
  styleUrls: ['./business-ad.component.scss'],
})
export class BusinessAdComponent implements OnInit, DoCheck {
  aBusinessList: any[] = [];
  responsiveOptions: any[] = [];

  slideShow: number = 1;
  slideCount: number = 3;
  infiniteScroll: boolean = true;
  isFullHD!: boolean;
  isHD!: boolean;
  isLaptop!: boolean;
  browserScreenWidth!: number;

  constructor(private http: HttpClient) {
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
  }

  public async ngOnInit(): Promise<void> {
    this.isLaptop = false;
    this.browserScreenWidth = window.screen.width;

    await this.GetBusinessListAsync();
  }

  public ngDoCheck(): void {
    this.defineResize();
  }

  /**
   * Функция получит список список бизнеса.
   * @returns Список бизнеса.
   */
  private async GetBusinessListAsync() {
    try {
      this.http
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

  @HostListener('window:resize', ['$event'])
  private defineResize() {
    this.browserScreenWidth = window.screen.width;

    if (this.browserScreenWidth >= 1400) {
      this.isFullHD = true;
    } else {
      this.isFullHD = false;
    }

    if (this.browserScreenWidth >= 1200 && this.browserScreenWidth < 1400) {
      this.isHD = true;
    } else {
      this.isHD = false;
    }

    if (this.browserScreenWidth >= 992 && this.browserScreenWidth < 1199) {
      this.isLaptop = true;
    } else {
      this.isLaptop = false;
    }
  }
}
