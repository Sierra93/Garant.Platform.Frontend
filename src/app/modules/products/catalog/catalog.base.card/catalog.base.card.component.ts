import { Component, Input } from "@angular/core";
import { products } from "../../products";
import { Observable } from "rxjs";
import { GarItemComponent } from "../../../../gar-lib/gar-item/gar-item.component";

/**
 * Базовый компонент представления карточки каталога
 * */
@Component({
	template: ''
})
export abstract class CatalogBaseCardComponent<T> extends GarItemComponent<T> implements products.catalog.IShortCard<T> {

	@Input()
	set item(value: T) {
		this._product$.next(value);
	}

  /**
   * Маршрут для перехода в карточку просмотра продукта
   */
  @Input()
  pathInfo: string = '/';

  /**
   * Маршрут для перехода на шаг приобретения продукта
   */
  @Input()
  pathBuy: string = '/';

	readonly product$: Observable<T> | undefined = this._product$;

}
