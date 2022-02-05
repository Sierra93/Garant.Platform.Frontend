import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isGarant: boolean = false;

  ngDoCheck(){
    if (window.location.href.includes("stage")) {
      this.isGarant = true;
    } else {
      this.isGarant = false;
    }
  }
}
