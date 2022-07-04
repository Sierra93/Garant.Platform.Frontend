import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { GarBaseInputComponent } from "../gar-base-input/gar-base-input.component";
import { NgControl } from "@angular/forms";

export type InputType = 'search' | 'email' | 'tel' | 'url' | 'text' | 'date';

/**
 * Компонент ввода строчных значений
 *
 * @param type
 * */
@Component({
	selector: 'gar-input-text',
	templateUrl: './gar-input-text.component.html',
	styleUrls: ['./gar-input-text.component.scss'],
	host: {
		class: 'gar-input-text'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GarInputTextComponent extends GarBaseInputComponent<string> {

	private _type: InputType = 'text';

	/**
	 * Тип для input
	 *
	 * - по дефолту text
	 *
	 * @use 'search' | 'email' | 'tel' | 'url' | 'text'
	 * */
	@Input('type')
	set type(value: InputType) {
		this._type = value ? value : 'text';
	}

	get type(): InputType {
		return this._type;
	}

	constructor(
		protected _cdRef: ChangeDetectorRef,
		protected _control: NgControl
	) {
		super(_cdRef, _control)
	}
}
