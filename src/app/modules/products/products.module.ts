import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogShortCardComponent } from "./catalog/catalog.short.card/catalog.short.card.component";
import { GarLibModule } from "../../gar-lib/gar-lib.module";
import { RouterModule } from "@angular/router";

const _COMPONENTS = [
  CatalogShortCardComponent
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
export class ProductsModule { }
