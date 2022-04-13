import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarImgUploaderComponent } from './gar-img-uploader/gar-img-uploader.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { GarIconComponent } from './gar-icon/gar-icon.component';
import { PriceFormatPipe } from "./pipes/priceFormat.pipe";
import { GarCarouselComponent } from './gar-carousel/gar-carousel.component';
import { GarCarouselItemDirective } from './gar-carousel/gar-carousel-item.directive';
import { GarButtonComponent } from './gar-button/gar-button.component';

const _COMPONENTS = [
	GarImgUploaderComponent,
	GarIconComponent,
	GarCarouselComponent,
	GarButtonComponent
]

const _PIPES = [
	PriceFormatPipe
]

const _DIRECTIVES = [
	GarCarouselItemDirective
]

@NgModule({
	imports: [
		CommonModule,
		DragDropModule
	],
	declarations: [
		..._COMPONENTS,
		..._PIPES,
		..._DIRECTIVES
	],
	exports: [
		..._COMPONENTS,
		..._PIPES,
		..._DIRECTIVES
	]
})
export class GarLibModule {
}
