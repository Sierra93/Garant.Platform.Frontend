import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogBaseCardComponent } from "../catalog.base.card/catalog.base.card.component";

@Component({
  selector: 'app-catalog-simple-card',
  templateUrl: './catalog.simple.card.component.html',
  styleUrls: ['./catalog.simple.card.component.scss'],
  host: {
    class: 'gar-card secondary'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogSimpleCardComponent extends CatalogBaseCardComponent<any> {

  constructor(
    private _router: Router
  ) {
    super();
  }

  doView(): void {
    this._router.navigateByUrl(this.pathInfo)
  }

  doBuy(): void {
    this._router.navigateByUrl(this.pathBuy)
  }
}
