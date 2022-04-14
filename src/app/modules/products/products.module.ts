import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogShortCardComponent } from "./catalog/catalog.short.card/catalog.short.card.component";
import { GarLibModule } from "../../gar-lib/gar-lib.module";
import { RouterModule } from "@angular/router";
import { CatalogPromoCardComponent } from './catalog/catalog.promo.card/catalog.promo.card.component';

const _COMPONENTS = [
	CatalogShortCardComponent,
	CatalogPromoCardComponent
]

/**
 * Модуль, публикующий компоненты, относящиеся к представлению каталога
 * */
@NgModule({
	declarations: [
		..._COMPONENTS
	],
	exports: [
		..._COMPONENTS
	],
	imports: [
		CommonModule,
		GarLibModule,
		RouterModule
	]
})
export class ProductsModule {
}
