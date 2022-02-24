import { Component, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { filter, map, switchMap } from "rxjs/operators";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { API_URL } from "../../core/core-urls/api-url";

@Component({
	selector: 'gar-youtube-preview',
	templateUrl: './gar-youtube-preview.component.html',
	styleUrls: ['./gar-youtube-preview.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => GarYoutubePreviewComponent),
		multi: true
	}],
	host: {
		class: 'gar-row'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class GarYoutubePreviewComponent implements ControlValueAccessor {
	
	public value: string | null | undefined;
	
	private _value$ = new BehaviorSubject<string | null>(null);
	
	public videoPreviewLink$ = this._value$.pipe(
		map(link => link
			? `https://img.youtube.com/vi/${link!.split('/').slice(-1).join(' ')}/maxresdefault.jpg`
			: null)
	)
	
	public nameVide$ = this._value$.pipe(
		filter(o => !!o),
		switchMap(link =>
			this._http.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${link!.split('/').slice(-1).join(' ')}&origin=${API_URL.apiUrl}`))
	)
	
	onChange = (_: string | null) => {};
	onTouched = () => {};
	
	constructor(
		private _http: HttpClient
	) {}
	
	writeValue(value: string): void {
		this.value = value;
		this._value$.next(value);
		this.onChange(value)
	}
	
	registerOnChange(fn: (value: string | null) => void): void {
		this.onChange = fn;
	}
	
	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}
	
	remove(): void {
		this.onChange(null);
		this.value = null;
		this._value$.next(null);
	}
}
