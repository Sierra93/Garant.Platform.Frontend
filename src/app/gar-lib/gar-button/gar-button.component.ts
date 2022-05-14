import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Optional,
	HostBinding,
	HostListener
} from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { FormGroupDirective } from "@angular/forms";
import { GarDestroyService } from "../gar-destroy.service";
import { map } from "rxjs/operators";

export type GarBtnRole = 'default' | 'primary' | 'secondary' | 'critical' | 'filter' ;

/**
 * Компонент кнопка
 *
 * @param hint - установка title для кнопки
 * @param disabled - установка для кнопки состояния disabled
 * @param isSubmit - установка для кнопки type=“submit”
 * @param role - установка для кнопки роли, на основании которой устанавливается класс, стилизующий кнопку
 *
 * @example
 * <gar-button role="primary">Продать бизнес</gar-button>
 * */
@Component({
	selector: 'gar-button',
	templateUrl: './gar-button.component.html',
	styleUrls: ['./gar-button.component.scss'],
	providers: [GarDestroyService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GarButtonComponent {
	
	private readonly _hint$ = new BehaviorSubject<string | null>(null);
	private readonly _isDisabled$ = new BehaviorSubject<boolean>(false);
	private readonly _isSubmit$ = new BehaviorSubject<boolean>(false);
	
	@HostBinding('class')
	private get _hostClasses() {
		return `gar-btn ${this._isDisabled$.getValue() ? 'disabled' : ''} ${this._role || 'default'}`;
	}
	
	@HostListener('click')
	private onClick() {
		if (!this._isSubmit$.getValue()) {
			return;
		}
		this._parentFormRef?.form?.markAllAsTouched();
	}
	
	/**
	 * title для элемента
	 *
	 * @remarks назван hint, так как нельзя переиспользовать нативные атрибуты
	 * */
	@Input()
	set hint(value: string) {
		this._hint$.next(value || null);
	}
	
	/**
	 * disabled для кнопки
	 * */
	@Input('disabled')
	set _disabled(value: string) {
		this._isDisabled$.next(value === '' ? true : !!value);
	}
	
	/**
	 * установка для кнопки type="submit"
	 */
	@Input('isSubmit')
	set isSubmit(value: boolean | '') {
		this._isSubmit$.next(value || value === '');
	}
	
	@Input('role')
	_role: GarBtnRole | undefined;
	
	readonly isDisabled$: Observable<boolean> = this._isDisabled$;
	readonly hint$ = this._hint$.asObservable().pipe(
		map(hint => hint || '')
	);
	readonly type$ = this._isSubmit$.pipe(
		map(isSubmit => isSubmit ? 'submit' : 'button')
	);
	
	constructor(
		@Optional()
		private _parentFormRef: FormGroupDirective,
		private _destroy$: GarDestroyService
	) {}
	
}
