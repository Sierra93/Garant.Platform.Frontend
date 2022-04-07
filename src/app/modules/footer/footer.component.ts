import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonDataService } from 'src/app/services/common/common-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

/**
 * Класс модуля футера.
 */
export class FooterModule implements OnInit {
  aFooter: any[] = [];
  aFooterColumn1: any[] = [];
  aFooterColumn2: any[] = [];
  aFooterColumn3: any[] = [];
  aFooterColumn4: any[] = [];
  isMobile: boolean = false;

  socialItems: any[] = [
    { name: 'telegram', link: '#' },
    { name: 'facebook', link: '#' },
    { name: 'instagram', link: '#' },
    { name: 'youtube', link: '#' }
  ];

  constructor(
    private router: Router,
    private http: HttpClient,
    private commonService: CommonDataService
  ) {}

  public async ngOnInit() {
    await this.initFooter();
    this.isMobile = window.innerWidth < 768;
  }

  @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }


  /**
   * Функция получит поля футера.
   */
  private async initFooter() {
    try {
      await this.commonService.initFooterAsync().then((data: any) => {
        // Распределит пункты футера в каждый стобец.
        data.forEach((item: any) => {
          if (item.column == 1 && item.title !== 'gobizy') {
            this.aFooterColumn1.push(item);
          } else if (item.column == 2) {
            this.aFooterColumn2.push(item);
          } else if (item.column == 3) {
            this.aFooterColumn3.push(item);
          } else if (item.column == 4) {
            this.aFooterColumn4.push(item);
          }
        });

        this.aFooter.push(this.aFooterColumn1, this.aFooterColumn2, this.aFooterColumn3, this.aFooterColumn4);
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  // Если в первом столбце isPlace = true, то редиректим по маршруту /ad/create
  public redirectCreateAd() {
    this.aFooterColumn1.forEach((column: any) => {
      let { isPlace } = column;
      if (isPlace) {
        this.router.navigate(['/ad/create']);
      }
    });
  }

  /**
   * Функция распределит роуты по пунктам футера.
   * @param name - параметр роута с названием пункта.
   */
  public onGetMenuFooter(name: string) {
    // switch (name) {
    //     case "Вход или регистрация":
    //         this.router.navigate(["/login"], { queryParams: { loginType: "code" } });
    //         break;
    // }
  }
}
