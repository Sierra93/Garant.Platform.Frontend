import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonDataService } from 'src/app/services/common/common-data.service';
import { Router } from '@angular/router';

interface FooterNavItem {
  column: number;
  isPlace: boolean;
  isSignleTitle: boolean;
  name: string;
  position: number;
  title: string;
}

interface FooterSocialItem {
  name: string,
  link: string
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

/**
 * Класс модуля футера.
 */
export class FooterModule implements OnInit {
  aFooter: any[] = [[], [], [], []];

  isMobile: boolean = false;

  socialItems: FooterSocialItem[] = [
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
      await this.commonService.initFooterAsync().then((data: any): void => {
        // Распределит пункты футера в каждый стобец.
        data.forEach((item: FooterNavItem) => {
          if (item.title !== 'gobizy') {
            this.aFooter[item.column - 1].push(item);
          }
        });
      });
    } catch (e: any) {
      throw new Error(e);
    }
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
