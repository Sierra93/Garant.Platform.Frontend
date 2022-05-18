import { Injectable } from "@angular/core";
import { BehaviorSubject, fromEvent, Observable } from "rxjs";
import { environment } from "../environment.d";
import { map, shareReplay, startWith } from "rxjs/operators";

declare const window: Window;

/**
 * Поставщик Window для приложения с расширенными свойствами
 * */
@Injectable()
export class WindowProvider {
	
	private readonly _width$: BehaviorSubject<number>;
	readonly application: environment.IApplicationWindow;
	readonly width$: Observable<number>;
	
	constructor() {
		this.application = window as environment.IApplicationWindow;
		this._width$ = new BehaviorSubject<number>(this.application.innerWidth);
		this.width$ = fromEvent(this.application, 'resize').pipe(
			startWith(true),
			map(e => this.application.innerWidth),
			shareReplay({bufferSize: 1, refCount: false})
		)
	}
	
}
