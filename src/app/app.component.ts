import { Component, OnInit } from '@angular/core';
import { Spinkit } from 'ng-http-loader';
import { MetrikaService } from "./services/common/metrika.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isGarant: boolean = false;
  spinnerStyle = Spinkit;

  constructor(
      private _metrika: MetrikaService
  ) { }

  ngDoCheck() {
    if (window.location.href.includes("stage")) {
      this.isGarant = true;
    } else {
      this.isGarant = false;
    }
  };
  
  ngOnInit(): void {
    this._metrika.initMetrika();
  }
}
