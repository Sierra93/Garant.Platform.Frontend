import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GarBaseInputComponent } from "../gar-base-input/gar-base-input.component";
import { NgControl } from "@angular/forms";

/**
 * Компонент ввода строчных значений
 *
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
export class GarInputTextComponent extends GarBaseInputComponent<string> implements OnInit {
	
	constructor(
		protected _cdRef: ChangeDetectorRef,
		protected _control: NgControl
	) {
		super(_cdRef, _control)
	}
	
	ngOnInit(): void {
	}
	
}
