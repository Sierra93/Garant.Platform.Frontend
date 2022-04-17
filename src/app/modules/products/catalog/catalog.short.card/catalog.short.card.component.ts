import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CatalogBaseCardComponent } from "../catalog.base.card/catalog.base.card.component";

/**
 * Компонент представления карточки каталога
 *
 * по макету представлен в "Популярные франшизы", "Новые объявления готового бизнеса" и т.д.
 * ...
 *
 * TODO: типизировать!
 * TODO: привести к одному типу объекты продуктов, отображаемых в каталоге
 * */
@Component({
  selector: 'app-catalog-short-card',
  templateUrl: './catalog.short.card.component.html',
  styleUrls: ['./catalog.short.card.component.scss'],
  host: {
    class: 'gar-card secondary'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogShortCardComponent extends CatalogBaseCardComponent<any> {

  constructor() {
    super();
  }

}
