import { Observable } from "rxjs";

export namespace products {
	export namespace catalog {
		export interface IShortCard<T> {
			readonly product$: Observable<T> | undefined;
			path: string | undefined;
		}
	}
}
