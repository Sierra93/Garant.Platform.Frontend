import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Объект реализующий оповещение о своем завершении.
 */
@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy {
	ngOnDestroy() {
		this.next();
		this.complete();
	}
}
