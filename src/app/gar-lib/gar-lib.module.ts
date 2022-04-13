import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarImgUploaderComponent } from './gar-img-uploader/gar-img-uploader.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { GarIconComponent } from './gar-icon/gar-icon.component';
import { PriceFormatPipe } from "./pipes/priceFormat.pipe";
import { GarCarouselComponent } from './gar-carousel/gar-carousel.component';
import { GarCarouselItemDirective } from './gar-carousel/gar-carousel-item.directive';
import { GarButtonComponent } from './gar-button/gar-button.component';
import { GarInputTextComponent } from "./gar-input-text/gar-input-text.component";
import { GarInputNumberComponent } from './gar-input-number/gar-input-number.component';
import { InputNumberModule } from "primeng/inputnumber";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InputTextModule } from "primeng/inputtext";

const _COMPONENTS = [
	GarImgUploaderComponent,
	GarIconComponent,
	GarCarouselComponent,
	GarButtonComponent,
	GarInputTextComponent,
	GarInputNumberComponent
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
		DragDropModule,
		InputNumberModule,
		FormsModule,
		BrowserAnimationsModule,
		InputTextModule
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
