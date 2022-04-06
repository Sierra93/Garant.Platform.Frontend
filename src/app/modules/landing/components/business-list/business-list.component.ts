import { Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/core/core-urls/api-url';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss'],
})
export class BusinessListComponent implements OnInit, DoCheck {
  aDataActions: any[] = [];
  isXxl!: boolean;
  browserScreenWidth!: number;

  constructor(private http: HttpClient) {}

  public async ngOnInit(): Promise<void> {
    this.isXxl = false;
    this.browserScreenWidth = window.screen.width;

    await this.GetActionsAsync();
  }

  public ngDoCheck(): void {
    this.defineResize();
  }

  /**
   * Функция получит данные для блока событий.
   */
  private async GetActionsAsync() {
    try {
      await this.http
        .post(API_URL.apiUrl.concat('/main/actions'), {})
        .subscribe({
          next: (response: any) => {
            console.log('Блок событий:', response);
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

  @HostListener('window:resize', ['$event'])
  private defineResize() {
    this.browserScreenWidth = window.screen.width;
    if (this.browserScreenWidth > 1400) {
      this.isXxl = true;
    } else {
      this.isXxl = false;
    }
  }
}
