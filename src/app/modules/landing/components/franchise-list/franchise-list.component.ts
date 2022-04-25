import { Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { CommonDataService } from 'src/app/services/common/common-data.service';

@Component({
  selector: 'app-franchise-list',
  templateUrl: './franchise-list.component.html',
  styleUrls: ['./franchise-list.component.scss'],
})
export class FranchiseListComponent implements OnInit, DoCheck {
  aPopularFranchises: any[] = [];
  responsiveOptions: any[] = [];
  isFullHD!: boolean;
  isHD!: boolean;
  isLaptop!: boolean;
  browserScreenWidth!: number;

  constructor(private commonService: CommonDataService) {
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
    this.isHD = false;
    this.isFullHD = false;
    this.browserScreenWidth = window.screen.width;

    await this.getPopularAsync();
  }

  public ngDoCheck(): void {
    this.defineResize();
  }

  /**
   * Функция получит список популярныз франшиз.
   * @returns Список франшиз.
   */
  private async getPopularAsync() {
    try {
      await this.commonService.getPopularAsync().then((data: any) => {
        console.log('Популярные франшизы:', data);
        this.aPopularFranchises = data;
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
