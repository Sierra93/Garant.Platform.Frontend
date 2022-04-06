import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/core/core-urls/api-url';
import { Component, OnInit, DoCheck, HostListener } from '@angular/core';

@Component({
  selector: 'app-business-blog',
  templateUrl: './business-blog.component.html',
  styleUrls: ['./business-blog.component.scss']
})
export class BusinessBlogComponent implements OnInit, DoCheck {
  aBlogs: any[] = [];

  isXxl!: boolean;
  browserScreenWidth!: number;

  constructor(private http: HttpClient) { }

  public async ngOnInit(): Promise<void> {
    this.isXxl = false;
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
    if (this.browserScreenWidth > 1200) {
      this.isXxl = true;
    } else {
      this.isXxl = false;
    }
  }
}
