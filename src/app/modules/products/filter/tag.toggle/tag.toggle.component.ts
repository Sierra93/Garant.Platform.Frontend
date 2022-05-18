import { Component, ChangeDetectionStrategy, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { GarDestroyService } from "../../../../gar-lib/gar-destroy.service";
import { products } from "../../products";

/**
 * Компонент представления тега в фильтре
 *
 * Реализует ControlValueAccessor
 *
 * @use Используется, как контрол в форме, в качестве данных принимает products.filter.ITag
 *
 * @see products.filter.ITag
 *
 * @example
 * <ng-container formArrayName="tags">
 *     <p *ngFor="let tag of tags; let i=index">
 *         <filter-tag-toggle [formControlName]="i"></filter-tag-toggle>
 *     </p>
 * </ng-container>
 * */
@Component({
	selector: 'filter-tag-toggle',
	templateUrl: './tag.toggle.component.html',
	styleUrls: ['./tag.toggle.component.scss'],
	providers: [GarDestroyService, {
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => TagToggleComponent),
		multi: true
	}],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagToggleComponent implements ControlValueAccessor {
	
	@HostBinding('class.checked')
	get checked(): boolean {
		return this.value.selected;
	}
	
	public value!: products.filter.ITag;
	
	constructor() {
	}
	
	onTouched = () => {
	};
	onChange = (_: products.filter.ITag) => {
	};
	
	registerOnChange(fn: (_: products.filter.ITag) => {}): void {
		this.onChange = fn;
		this.onTouched();
	}
	
	registerOnTouched(fn: () => {}): void {
		this.onTouched = fn;
	}
	
	writeValue(value: products.filter.ITag): void {
		this.value = value;
		this.onChange(value);
	}
	
	updateValue(event: boolean) {
		this.value.selected = event;
		this.onChange(this.value);
		this.onTouched();
	}
}
