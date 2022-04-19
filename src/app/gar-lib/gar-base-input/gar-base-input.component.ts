import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  ChangeDetectorRef,
  EventEmitter
} from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { gar } from "../gar";

/**
 * Класс описывающий базовое поведение для элементов ввода \ отображения библиотеки соответствующее контракту gar.lib.IFieldComponent
 *
 * @remark Без привязки к контролу (ngModel, formControlName, formControl) выбрасывается ошибка
 *
 * @see gar.lib.IFieldComponent
 *
 * @see gar.lib
 *
 * */
@Component({
  selector: 'gar-base-input',
  template: '',
  host: {
    class: 'gar-input'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class GarBaseInputComponent<T> implements gar.lib.IFieldComponent<T>, ControlValueAccessor {
  
  public static readonly cancelBtnIconName = 'icon-cancel';
  
  private _propagateChange: ((_: T | null) => void) | undefined;
  
  private _propagateTouched: (() => void) | undefined;
  
  private _value: T | null = null;
  
  /** placeholder для input */
  @Input('title')
  set _title(value: string) {
    this.title$.next(value);
  };
  
  /** флаг установки невалидности */
  @Input('invalid')
  set _invalid(value: boolean) {
    this.invalid$.next(value);
  };
  
  /** disabled для input */
  @Input('readonly')
  set _readonly(value: boolean | string) {
    this.readonly$.next((value === '' ? true : !!value)!);
  };
  
  /** геттер значения инпута */
  public get value(): T | null {
    return this._value;
  }
  
  /** сеттер значения инпута */
  public set value(value: T | null) {
    this._value = value;
    if (this._propagateChange) {
      this._propagateChange(value);
    }
    if (this.changed) {
      this.changed.emit(value);
    }
    this.afterRefreshValue(value);
  }
  
  public readonly title$ = new BehaviorSubject<string>('');
  public readonly invalid$ = new BehaviorSubject<boolean>(false);
  public readonly readonly$ = new BehaviorSubject<boolean>(false);
  
  @Output()
  public changed = new EventEmitter<T | null>();
  
  protected constructor(
      protected readonly _cdRef: ChangeDetectorRef,
      protected readonly _control: NgControl
  ) {
    _control.valueAccessor = this;
  }
  
  //#region ControlValueAccessor
  
  public writeValue(value: T): void {
    this._value = this.beforeSetOuterValue(value);
    this.afterRefreshValue(this._value);
  }
  
  public registerOnChange(fn: (_: T | null) => void): void {
    this._propagateChange = fn;
  }
  
  public registerOnTouched(fn: () => void): void {
    this._propagateTouched = fn;
  }
  
  //#endregion ControlValueAccessor
  
  public propagateTouched() {
    if (this._propagateTouched) {
      this._propagateTouched();
    }
  }
  
  public propagateChange() {
    if (this._propagateChange) {
      this._propagateChange(this._value);
    }
  }
  
  /**
   * Метод для реализации дополнительных действий перед установкой значения из VM.
   * Например, конвертации.
   */
  protected beforeSetOuterValue(value: unknown): T {
    return value as T;
  }
  
  /**
   * Метод для реализации дополнительных действий после обновления значения
   *
   * @remarks - значение считается обновленным вне зависимости, было ли оно установлено из вне или было изменено в компоненте
   */
  // eslint-disable-next-line no-unused-vars
  protected afterRefreshValue(value: T | null) {
    this._cdRef.markForCheck();
  }
}
