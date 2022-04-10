import { Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { CommonDataService } from 'src/app/services/common/common-data.service';

@Component({
  selector: 'app-garant',
  templateUrl: './garant.component.html',
  styleUrls: ['./garant.component.scss'],
})
export class GarantComponent implements OnInit, DoCheck {
  oSuggestion: any = {};
  isHideBusinessWithGarant: boolean = true;
  isLaptop!: boolean;
  isHD!: boolean;
  browserScreenWidth!: number;

  constructor(private commonService: CommonDataService) {}

  public async ngOnInit(): Promise<void> {
    this.isLaptop = false;
    this.isHD = false;
    this.browserScreenWidth = window.screen.width;

    await this.loadSingleSuggestionAsync();
  }

  public ngDoCheck(): void {
    this.defineResize();
  }

  /**
   * Функция получит одно предложение с флагом IsSingle.
   * @returns данные предложения.
   */
  private async loadSingleSuggestionAsync() {
    try {
      await this.commonService.loadSingleSuggestionAsync().then((data: any) => {
        this.oSuggestion = data;
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
  }
}
