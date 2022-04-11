import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CatalogBaseCardComponent } from "../catalog.base.card/catalog.base.card.component";

@Component({
	selector: 'app-catalog-promo-card',
	templateUrl: './catalog.promo.card.component.html',
	styleUrls: ['./catalog.promo.card.component.scss'],
	host: {
		class: 'gar-card secondary'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogPromoCardComponent extends CatalogBaseCardComponent<any> {
	
	constructor() {
		super()
	}
}
