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
  @Input() isModify: boolean = false;

  isXxl!: boolean;
  browserScreenWidth!: number;
  name: string = '';
  phoneNumber: string = '';

  constructor(private requestService: LandingRequestService) {}

  public ngOnInit(): void {
    this.isXxl = false;
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
    if (this.browserScreenWidth > 1200) {
      this.isXxl = true;
    } else {
      this.isXxl = false;
    }
  }
}
