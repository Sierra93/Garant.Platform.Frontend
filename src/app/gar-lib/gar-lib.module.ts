import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarImgUploaderComponent } from './gar-img-uploader/gar-img-uploader.component';
import { DragDropModule } from "@angular/cdk/drag-drop";


@NgModule({
	declarations: [
		GarImgUploaderComponent
	],
	imports: [
		CommonModule,
		DragDropModule
	],
	exports: [
		GarImgUploaderComponent
	]
})
export class GarLibModule {
}
