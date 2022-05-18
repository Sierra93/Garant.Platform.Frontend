import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CatalogBaseCardComponent } from "../catalog.base.card/catalog.base.card.component";

@Component({
  selector: 'app-catalog-news-card',
  templateUrl: './catalog.news.card.component.html',
  styleUrls: ['./catalog.news.card.component.scss'],
  host: {class: 'gar-card'},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogNewsCardComponent extends CatalogBaseCardComponent<any> {

  constructor() {
    super();
  }
}
