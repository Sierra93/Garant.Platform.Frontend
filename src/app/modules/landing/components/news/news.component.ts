import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/core/core-urls/api-url';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  aNews: any[] = [];

  constructor(private http: HttpClient) {}

  public async ngOnInit(): Promise<void> {
    await this.GetNewsTopAsync();
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
}
