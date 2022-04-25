import { Component, OnInit, DoCheck, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/core/core-urls/api-url';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, DoCheck {
  aBusinessCategories: any[] = [];
  aFranchiseCategories: any[] = [];

  isLaptop!: boolean;
  isHD!: boolean;
  isSmall!: boolean;
  browserScreenWidth!: number;

  constructor(private http: HttpClient) {}

  public async ngOnInit(): Promise<void> {
    this.isLaptop = false;
    this.isHD = false;
    this.isSmall = false;
    this.browserScreenWidth = window.screen.width;

    await this.GetBusinessCategoriesAsync();
    await this.GetFranchiseCategoriesAsync();
  }
  public ngDoCheck(): void {
    this.defineResize();
  }

  /**
   * Функция получит список франшиз.
   * @returns Список франшиз.
   */
  private async GetBusinessCategoriesAsync() {
    try {
      await this.http
        .post(API_URL.apiUrl.concat('/main/business-categories-list'), {})
        .subscribe({
          next: (response: any) => {
            console.log('Список категорий бизнеса, мой вариант', response);
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
   * Функция получит список франшиз.
   * @returns Список франшиз.
   */
  private async GetFranchiseCategoriesAsync() {
    try {
      await this.http
        .get(API_URL.apiUrl.concat('/franchise/category-list'), {})
        .subscribe({
          next: (response: any) => {
            console.log('Список категорий франшиз', response);
            this.aFranchiseCategories = response;
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

    if ((this.browserScreenWidth >= 992) && (this.browserScreenWidth < 1199)) {
      this.isLaptop = true;
    } else {
      this.isLaptop = false;
    }

    if (this.browserScreenWidth <= 576) {
      this.isSmall = true;
    } else {
      this.isSmall = false;
    }
  }
}
