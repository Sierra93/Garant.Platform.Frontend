import { Injectable } from "@angular/core";
import { session } from "./session";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { SessionItems } from "./session-items";


@Injectable()
export class SessionService implements session.ISessionProvider {
	
	// @ts-ignore
	private _token$: BehaviorSubject<{ token: null | string }> = new BehaviorSubject({
		token: null
	});
	
	get isLogin$(): Observable<boolean> {
		return this._token$.pipe(
			map(t => !!t.token)
		)
	};
	
	get isUserHaveAccess(): boolean {
		//на будущее
		return true;
	};
	
	constructor () {
		this._token$.next({[SessionItems.token]: this.getDataItem(SessionItems.token)});
		this._token$.pipe(
			tap(token => {
				if (token?.token ) {
					this.updateDataItem(SessionItems.token, token.token)
				} else {
					this.removeDataItem(SessionItems.token)
				}
			})
		).subscribe()
	}
	
	endSession(): void {
		// на будущее
	}
	initSession(): void {
		// на будущее
	}
	
	startSession(): void {
		// на будущее
	}
	
	getDataItem(key: string): string | null {
		return sessionStorage.getItem(key);
	}
	
	removeDataItem(key: string): void {
		sessionStorage.removeItem(key);
	}
	
	updateDataItem(key: string, value: string): void {
		sessionStorage.setItem(key, value);
	}
	
	setToken(token: { token: string }): void {
		this._token$.next(token)
	}
	
}
