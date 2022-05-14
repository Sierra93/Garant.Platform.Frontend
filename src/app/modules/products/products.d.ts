import { Observable } from "rxjs";

export namespace products {
	export namespace catalog {
		export interface IShortCard<T> {
			readonly product$: Observable<T> | undefined;
			path: string | undefined;
		}
		
		export interface IRecentlyPurchasedProduct {
			countDays: number;
			dateBuy: string;
			dayDeclination: string;
			name: string;
			price: string;
			text: string;
			textDoPrice: string;
			url: string;
		}
	}
}
