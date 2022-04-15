import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { GarBaseInputComponent } from "../gar-base-input/gar-base-input.component";
import { NgControl } from "@angular/forms";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { map } from "rxjs/operators";

export type ModeNumberInput = 'currency' | 'decimal';

/**
 * Компонент ввода числовых значений
 *
 * @param prefix Префикс, устанавливающийся перед вводимым значением
 *
 * @param postFix Постфикс, устанавливающийся после вводимого значения
 *
 * @param maxFractionDigits Установка максимального количества десятичных разрядов (цифр после запятой)
 *
 * @param mode Флаг установки типа отображения
 * */
@Component({
	selector: 'gar-input-number',
	templateUrl: './gar-input-number.component.html',
	styleUrls: ['./gar-input-number.component.scss'],
	host: {
		class: 'gar-input-number'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GarInputNumberComponent extends GarBaseInputComponent<number> implements OnInit {
	
	private readonly _prefix$ = new ReplaySubject<string>();
	private readonly _postFix$ = new ReplaySubject<string>();
	private readonly _maxFractionDigits$ = new BehaviorSubject(0);
	private readonly _mode$ = new BehaviorSubject<ModeNumberInput>('decimal');
	
	/** Префикс, устанавливающийся перед вводимым значением */
	@Input('prefix')
	set _prefix(value: string) {
		this._prefix$.next(value);
	}
	
	/** Постфикс, устанавливающийся после вводимого значения */
	@Input('postFix')
	set _postFix(value: string) {
		this._postFix$.next(value);
	}
	
	/**
	 * Установка максимального количества десятичных разрядов (цифр после запятой)
	 *
	 * @remarks По умолчанию 0
	 * */
	@Input('maxFractionDigits')
	set _maxFractionDigits(value: number | string) {
		this._maxFractionDigits$.next(
			value === '' || !value ? 0 : +value
		);
	}
	
	/**
	 * Флаг установки типа отображения
	 *
	 * - decimal - по умолчанию, десятичное число
	 * - currency - в этом режиме устанавливается знак валюты (рубля) в конце значения
	 *
	 * @see ModeNumberInput
	 * */
	@Input('mode')
	set _mode(value: ModeNumberInput) {
		this._mode$.next(value);
	}
	
	
	readonly prefix$: Observable<string> = this._prefix$.pipe(
		map(p => p ?? '')
	);
	
	readonly postFix$: Observable<string> = this._postFix$.pipe(
		map(p => p ?? '')
	);
	
	readonly maxFractionDigits$: Observable<number> = this._maxFractionDigits$;
	readonly mode$: Observable<ModeNumberInput> = this._mode$;
	
	get isCurrency(): boolean {
		return this._mode$.getValue() === 'currency';
	}
	
	constructor(
		protected _cdRef: ChangeDetectorRef,
		protected _control: NgControl
	) {
		super(_cdRef, _control)
	}
	
	ngOnInit(): void {
	}
	
}
