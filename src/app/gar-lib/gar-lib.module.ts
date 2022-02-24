import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarImgUploaderComponent } from './gar-img-uploader/gar-img-uploader.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { GarYoutubePreviewComponent } from './gar-youtube-preview/gar-youtube-preview.component';
import { FormsModule } from "@angular/forms";


@NgModule({
	declarations: [
		GarImgUploaderComponent,
		GarYoutubePreviewComponent
	],
	imports: [
		CommonModule,
		DragDropModule,
		FormsModule
	],
	exports: [
		GarImgUploaderComponent,
		GarYoutubePreviewComponent
	]
})
export class GarLibModule {
}
