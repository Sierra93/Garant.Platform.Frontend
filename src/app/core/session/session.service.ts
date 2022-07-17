import { Injectable } from "@angular/core";
import { session } from "./session";
import { BehaviorSubject, Observable } from "rxjs";
import {map, shareReplay, takeUntil, tap} from 'rxjs/operators';
import { SessionItems } from "./session-items";
import {GarDestroyService} from '../../gar-lib/gar-destroy.service';
import { Router } from "@angular/router";


@Injectable()
export class SessionService extends GarDestroyService implements session.ISessionProvider {

	// @ts-ignore
	private _token$: BehaviorSubject<{ token: null | string }> = new BehaviorSubject({
		token: null
	});

  readonly isLogin$ = this._token$.pipe(
    map(t => !!t.token),
    shareReplay({refCount: false, bufferSize: 1}),
    takeUntil(this)
  )

	get isUserHaveAccess(): boolean {
		//на будущее
		return true;
	};

	constructor(
    private _router: Router
  ) {
    super();
    this._token$.next({[SessionItems.token]: this.getDataItem(SessionItems.token)});
		this._token$.pipe(
			tap(token => {
				if (token?.token ) {
					this.updateDataItem(SessionItems.token, token.token)
				} else {
					this.removeDataItem(SessionItems.token)
				}
			}),
      takeUntil(this)
		).subscribe()
	}

	endSession(): void {
		this._token$.next({[SessionItems.token]: null});
    this._router.navigate(['/'])
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
