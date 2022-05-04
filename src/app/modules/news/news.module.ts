import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsPageComponent } from "./components/news.page/news.page.component";
import { RouterModule } from "@angular/router";
import { GarLibModule } from "../../gar-lib/gar-lib.module";
import { ProductsModule } from "../products/products.module";



@NgModule({
  declarations: [
      NewsPageComponent
  ],
	imports: [
		CommonModule,
		RouterModule.forChild([{
			path: '',
			component: NewsPageComponent
		}]),
		GarLibModule,
		ProductsModule
	]
})
export class NewsModule { }
