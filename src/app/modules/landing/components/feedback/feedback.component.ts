import { Component, OnInit, DoCheck, HostListener, Input } from '@angular/core';
import { LandingRequestService } from 'src/app/modules/landing/services/landing.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit, DoCheck {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() tooltip: string = '';
  @Input() imagePath: string = '';
  @Input() bgColor: string = '';
  @Input() isBgColor: boolean = false;
  @Input() hasConsultant: boolean = false;

  isLaptop!: boolean;
  isHD!: boolean;
  isFullHD!: boolean;
  isSmall!: boolean;
  browserScreenWidth!: number;
  name: string = '';
  phoneNumber: string = '';

  constructor(private requestService: LandingRequestService) {}

  public ngOnInit(): void {
    this.isLaptop = false;
    this.isHD = false;
    this.isFullHD = false;
    this.isSmall = false;
    this.browserScreenWidth = window.screen.width;
  }
  public ngDoCheck(): void {
    this.defineResize();
  }

  public onSendLandingRequestAsync(name: string, phoneNumber: string) {
    this.requestService
      .sendLandingRequestAsync(name, phoneNumber, 'Упаковка франшиз')
      .subscribe(() => {
        this.name = '';
        this.phoneNumber = '';
      });
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
