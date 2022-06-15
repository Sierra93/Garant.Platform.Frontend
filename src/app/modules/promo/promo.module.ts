import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoBlockCardComponent } from './components/promo-block.card/promo-block.card.component';
import { GarLibModule } from "../../gar-lib/gar-lib.module";
import { RouterModule } from "@angular/router";
import { PromotionCardComponent } from './components/promotion.card/promotion.card.component';

const _COMPONENTS = [ PromoBlockCardComponent, PromotionCardComponent ]

@NgModule({
	declarations: [..._COMPONENTS],
	exports: [..._COMPONENTS],
	imports: [
		CommonModule,
		GarLibModule,
		RouterModule
	]
})
export class PromoModule {
}
