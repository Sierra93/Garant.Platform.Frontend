import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoBlockCardComponent } from './components/promo-block.card/promo-block.card.component';
import { GarLibModule } from "../../gar-lib/gar-lib.module";
import { RouterModule } from "@angular/router";


@NgModule({
	declarations: [
		PromoBlockCardComponent
	],
	exports: [
		PromoBlockCardComponent
	],
	imports: [
		CommonModule,
		GarLibModule,
		RouterModule
	]
})
export class PromoModule {
}
