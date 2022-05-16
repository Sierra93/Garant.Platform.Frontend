import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NewsService } from "../../news.service";
import { GarDestroyService } from "../../../../gar-lib/gar-destroy.service";
import { shareReplay, takeUntil } from "rxjs/operators";

@Component({
	selector: 'app-news-block',
	templateUrl: './news.block.component.html',
	styleUrls: ['./news.block.component.scss'],
	providers: [GarDestroyService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsBlockComponent implements OnInit {
	
	news$ = this._service.getBlogNews().pipe(
		shareReplay(1),
		takeUntil(this._destroy$)
	)
	
	/**
	 * Заголовок над блоком новостей
	 *
	 * @default Новости делового мира
	 * */
	@Input('title')
	title: string = 'Новости делового мира';
	
	/**
	 * Ссылка на баннер
	 *
	 * @default пока /assets/images/promo-block.png
	 * */
	@Input('banner')
	src: string = '/assets/images/promo-block.png'
	
	constructor(
		private _service: NewsService,
		private _destroy$: GarDestroyService
	) {
	}
	
	ngOnInit(): void {
	}
	
}
