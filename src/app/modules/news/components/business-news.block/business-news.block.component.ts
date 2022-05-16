import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { GarDestroyService } from "../../../../gar-lib/gar-destroy.service";
import { NewsService } from "../../news.service";
import { WINDOW } from "../../../../../environments/window/window.token";
import { WindowProvider } from "../../../../../environments/window/window.provider";
import { switchMap } from "rxjs/operators";
import { combineLatest, of } from "rxjs";

@Component({
	selector: 'app-business-news-block',
	templateUrl: './business-news.block.component.html',
	styleUrls: ['./business-news.block.component.scss'],
	providers: [GarDestroyService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessNewsBlockComponent implements OnInit {
	
	readonly news$ = this._service.getBusinessNews().pipe(
		switchMap(news => combineLatest([of(news)]))
	)
	
	constructor(
		private _fb: FormBuilder,
		private _service: NewsService,
		private _destroy$: GarDestroyService,
		@Inject(WINDOW)
		private _window: WindowProvider
	) {
	}
	
	ngOnInit(): void {
	}
	
}
