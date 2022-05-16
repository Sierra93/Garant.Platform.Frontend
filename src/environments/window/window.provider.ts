import { HostListener, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../environment.d";

declare const window: Window;

/**
 * Поставщик Window для приложения с расширенными свойствами
 * */
@Injectable()
export class WindowProvider {
	
	private readonly _width$: BehaviorSubject<number>;
	readonly application: environment.IApplicationWindow;
	readonly width$: Observable<number>;
	
	
	@HostListener('resize')
	private resizeHandler() {
		this._width$.next(window.innerWidth);
	}
	
	constructor() {
		this.application = window as environment.IApplicationWindow;
		this._width$ = new BehaviorSubject<number>(this.application.innerWidth);
		this.width$ = this._width$;
	}
	
}
