import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPageComponent } from './components/blog.page/blog.page.component';
import { RouterModule } from "@angular/router";
import { ProductsModule } from "../products/products.module";


@NgModule({
	declarations: [
		BlogPageComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild([{
			path: '',
			component: BlogPageComponent
		}]),
		ProductsModule
	]
})
export class BlogModule {
}
