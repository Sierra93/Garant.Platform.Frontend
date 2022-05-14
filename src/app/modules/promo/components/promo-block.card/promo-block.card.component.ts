import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CatalogPromoCardComponent } from "../../../products/catalog/catalog.promo.card/catalog.promo.card.component";
import { PromoService } from "../../promo.service";
import { shareReplay } from "rxjs/operators";

/**
 * Блок со слайдером
 *
 * TODO: Необходимо реализовать через провайдер данных с общей моделью, сейчас берём общие данные для всех страниц
 * */
@Component({
	selector: 'app-promo-block-card',
	templateUrl: './promo-block.card.component.html',
	styleUrls: ['./promo-block.card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromoBlockCardComponent {
	
	/**
	 * Заголовок над слайдером
	 *
	 * @default 'Недавно приобрели'
	 * */
	@Input('sliderTitle')
	sliderTitle = 'Недавно приобрели';
	
	/**
	 * Заголовок над баннером
	 *
	 * @default 'Покупка бизнеса с гарантиями'
	 * */
	@Input('bannerTitle')
	bannerTitle = 'Покупка бизнеса с гарантиями';
	
	cardComponent = CatalogPromoCardComponent;
	
	readonly aSliderItems$ = this._service.getRecentlyPurchasedProducts().pipe(
		shareReplay(1),
	)
	
	readonly actionsTop$ = this._service.actionsTop$;
	
	constructor(
		private _service: PromoService
	) {
	}
	
}
