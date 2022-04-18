import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/core/core-urls/api-url';
import { Component, OnInit, DoCheck, HostListener } from '@angular/core';

@Component({
  selector: 'app-business-blog',
  templateUrl: './business-blog.component.html',
  styleUrls: ['./business-blog.component.scss'],
})
export class BusinessBlogComponent implements OnInit, DoCheck {
  aBlogs: any[] = [];

  isLaptop!: boolean;
  isHD!: boolean;
  isFullHD!: boolean;
  browserScreenWidth!: number;
  responsiveOptions!: any[];
  blogsLength!: number;

  constructor(private http: HttpClient) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  public async ngOnInit(): Promise<void> {
    this.isLaptop = false;
    this.isHD = false;
    this.isFullHD = false;
    this.browserScreenWidth = window.screen.width;

    await this.GetBlogsAsync();
  }

  public ngDoCheck(): void {
    this.defineResize();
  }

  /**
   * Функция получит список блогов.
   * @returns Список блогов.
   */
  private async GetBlogsAsync() {
    try {
      await this.http
        .post(API_URL.apiUrl.concat('/blog/get-blogs'), {})
        .subscribe({
          next: (response: any) => {
            console.log('Список блогов:', response);
            this.aBlogs = response;
            this.blogsLength = this.aBlogs.length;
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
