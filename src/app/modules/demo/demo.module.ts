import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './components/demo.page/demo.page.component';
import { RouterModule } from "@angular/router";
import { GarLibModule } from "../../gar-lib/gar-lib.module";
import { FormsModule } from "@angular/forms";

/**
 * Модуль, публикующий страницу Demo
 */
@NgModule({
	declarations: [
		DemoPageComponent
	],
	imports: [
		RouterModule.forChild([{
			path: '',
			component: DemoPageComponent
		}]),
		CommonModule,
		GarLibModule,
		FormsModule
	]
})
export class DemoModule {
}
