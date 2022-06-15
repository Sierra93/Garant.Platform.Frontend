import { Injectable } from '@angular/core';
import { NgxMetrikaService } from "@kolkov/ngx-metrika";

@Injectable({
  providedIn: 'root'
})
export class MetrikaService {

  constructor(
      private _ym: NgxMetrikaService
  ) { }
  
  initMetrika() {
    this._ym.configure({
      id: 89193773,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    });
  }
}
