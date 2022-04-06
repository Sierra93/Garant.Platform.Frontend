import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarImgUploaderComponent } from './gar-img-uploader/gar-img-uploader.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { GarIconComponent } from './gar-icon/gar-icon.component';

const _COMPONENTS = [
	GarImgUploaderComponent,
	GarIconComponent
]

@NgModule({
	declarations: [
		..._COMPONENTS
	],
	imports: [
		CommonModule,
		DragDropModule
	],
	exports: [
		..._COMPONENTS
	]
})
export class GarLibModule {
}
