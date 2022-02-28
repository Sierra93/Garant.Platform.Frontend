import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isGarant: boolean = false;
  spinnerStyle = Spinkit;

  constructor() { }

  ngDoCheck() {
    if (window.location.href.includes("stage")) {
      this.isGarant = true;
    } else {
      this.isGarant = false;
    }
  };
}
