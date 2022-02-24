import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Spinkit } from 'ng-http-loader';
import { LocaleConfig } from './core/ngx-translate/locale.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isGarant: boolean = false;
  spinnerStyle = Spinkit;

  constructor(private translateService: TranslateService) { }

  public ngOnInit(): void {
    this.translateService.use(LocaleConfig.defaultLocale);
    this.translateService.get(['KEY1', 'KEY2'])
      .subscribe(translations => {
        console.log(translations['KEY1'])
        console.log(translations['KEY2'])
      });
  };

  ngDoCheck() {
    if (window.location.href.includes("stage")) {
      this.isGarant = true;
    } else {
      this.isGarant = false;
    }
  };
}
