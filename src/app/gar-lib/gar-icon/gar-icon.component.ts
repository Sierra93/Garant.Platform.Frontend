import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

/**
 * Компонент отображения иконки
 *
 * Принимает на вход
 *
 * @param name - название иконки
 * @param path - путь к спрайту
 *
 * @example
 * <gar-icon name="megaphone"></gar-icon>
 *
 * @default
 * Устанавливается маршрут к спрайту с иконками assets/icons/main-sprite.svg, назначается в виде заглушки иконка по умолчанию empty
 *
 * Наследует стили, применяемые к компоненту напрямую или наследует от родителя
 *
 * TODO: обдумать необходимые конфиги, вынести опции конфигов для компонента в провайдер, прописать стили для компонента в layout
 * */
@Component({
	selector: 'gar-icon',
	template: `
        <svg>
            <use [attr.href]="link$ | async"></use>
        </svg>
	`,
	styleUrls: ['./gar-icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GarIconComponent {
	
	static readonly defaultPath = 'assets/icons/main-sprite.svg';
	static readonly defaultIcon = 'empty';
	
	private readonly _name$ = new BehaviorSubject<string>(GarIconComponent.defaultIcon);
	link$: Observable<string> | undefined = this._name$.pipe(
		map(name => `${this._pathToSprite}#${name}`)
	);
	
	@Input('name')
	set _name(value: string) {
		this._name$.next(value);
	}
	
	@Input('path')
	set _path(value: string) {
		this._pathToSprite = value;
	}
	
	private _pathToSprite: string;
	
	constructor() {
		this._pathToSprite = GarIconComponent.defaultPath;
	}
}
