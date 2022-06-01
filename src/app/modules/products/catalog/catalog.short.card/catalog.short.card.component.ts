import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CatalogBaseCardComponent } from "../catalog.base.card/catalog.base.card.component";
import { Params, Router } from "@angular/router";

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
  selector: 'app-catalog-sort-card',
  templateUrl: './catalog.short.card.component.html',
  styleUrls: ['./catalog.short.card.component.scss'],
  host: {
    class: 'gar-card secondary'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogShortCardComponent extends CatalogBaseCardComponent<any> {
  
  get parseUrl(): string[] {
    return this.path ? ['/', ...this._router.parseUrl(this.path).root.children.primary.segments.map(s => s.path)] : [];
  }
  
  get queryParams(): Params | undefined {
    return this.path ? this._router.parseUrl(this.path).queryParams : undefined;
  }

  constructor(
      private _router: Router
  ) {
    super();
  }
  
}
