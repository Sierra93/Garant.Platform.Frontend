import { Component, OnInit, DoCheck, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/core/core-urls/api-url';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, DoCheck {
  aNews: any[] = [];
  browserScreenWidth!: number;
  isLaptop!: boolean;
  isHD!: boolean;

  constructor(private http: HttpClient) {}

  public async ngOnInit(): Promise<void> {
    this.isLaptop = false;
    this.isHD = false;

    await this.GetNewsTopAsync();
  }

  public ngDoCheck(): void {
    this.defineResize();
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

  @HostListener('window:resize', ['$event'])
  private defineResize() {
    this.browserScreenWidth = window.screen.width;

    if (this.browserScreenWidth >= 1200) {
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
