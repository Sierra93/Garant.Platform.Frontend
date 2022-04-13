import { Component } from '@angular/core';
import { ReplaySubject } from "rxjs";

/**
 * Контракт компонента, являющегося представлением основании входящего свойства item
 *
 * @params item
 *
 * Для унификации названия свойства с данными и корректной работой с библиотекой компонентов gar
 * */
@Component({
	template: ` `
})
export abstract class GarItemComponent<T> {
	
	protected readonly _product$ = new ReplaySubject<T>();
	
	public set item(value: T | undefined) {
		this._product$.next(value);
	}
}
