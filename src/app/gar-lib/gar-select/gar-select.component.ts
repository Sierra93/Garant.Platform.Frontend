import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { GarBaseInputComponent } from "../gar-base-input/gar-base-input.component";
import { NgControl } from "@angular/forms";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";

/**
 * Компонент инпута типа select
 *
 * */
@Component({
  selector: 'gar-select',
  templateUrl: './gar-select.component.html',
  styleUrls: ['./gar-select.component.scss'],
  host: {
    class: 'gar-select'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GarSelectComponent<IItem> extends GarBaseInputComponent<number | string | null> {
  
  private _items: IItem[] = [];
  private readonly _cleanable$ = new BehaviorSubject<boolean>(true);
  private readonly _displayLabel$ = new ReplaySubject<string>();
  
  /**
   * флаг отображения элемента очистки поля
   *
   * @remarks по умолчанию отображается
   * */
  @Input('cleanable')
  set _cleanable(value: boolean | '' | 'true' | 'false') {
    this._cleanable$.next(value === '' || value === 'true' ? true : value === 'false' ? false : value );
  }
  
  /** Массив значений */
  @Input('items')
  set items(value: IItem[]) {
    this._items = value;
  };
  
  /** Название поля отображаемого значения */
  @Input('displayLabel')
  set _itemContent(value: string) {
    this._displayLabel$.next(value);
  };
  
  get items(): IItem[] {
    return this._items;
  }
  
  readonly cleanable$: Observable<boolean> = this._cleanable$;
  readonly displayLabel$: Observable<string> = this._displayLabel$;
  
  constructor(
      protected _cdRef: ChangeDetectorRef,
      protected _control: NgControl
  ) {
    super(_cdRef, _control)
  }
  
  valueChanged(value: unknown) {
    this.value = value as unknown as number | string | null;
    this.propagateTouched();
  }
}
