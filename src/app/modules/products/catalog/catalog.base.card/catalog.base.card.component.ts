import { Component, Input } from "@angular/core";
import { products } from "../../products";
import { Observable, ReplaySubject } from "rxjs";

@Component({
	template: ''
})
export abstract class CatalogBaseCardComponent<T> implements products.catalog.IShortCard<T> {
	
	private readonly _product$ = new ReplaySubject<T>();
	
	@Input('item')
	set _item(value: T) {
		this._product$.next(value);
	}
	
	path: string | undefined;
	readonly product$: Observable<T> | undefined = this._product$;
	
}
