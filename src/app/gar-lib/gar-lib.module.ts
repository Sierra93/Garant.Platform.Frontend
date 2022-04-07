import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarImgUploaderComponent } from './gar-img-uploader/gar-img-uploader.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { GarIconComponent } from './gar-icon/gar-icon.component';
import { PriceFormatPipe } from "./pipes/priceFormat.pipe";

const _COMPONENTS = [
	GarImgUploaderComponent,
	GarIconComponent
]

const _PIPES = [
	PriceFormatPipe
]

@NgModule({
	imports: [
		CommonModule,
		DragDropModule
	],
	declarations: [
		..._COMPONENTS,
		..._PIPES
	],
	exports: [
		..._COMPONENTS,
		..._PIPES
	]
})
export class GarLibModule {
}
