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
import { InputTextModule } from "primeng/inputtext";
import { GarSelectComponent } from "./gar-select/gar-select.component";
import { DropdownModule } from "primeng/dropdown";
import { SelectionByPropertyPipe } from './pipes/selection-by-property.pipe';
import { GarToggleComponent } from './gar-toggle/gar-toggle.component';

const _COMPONENTS = [
	GarImgUploaderComponent,
	GarIconComponent,
	GarCarouselComponent,
	GarButtonComponent,
	GarInputTextComponent,
	GarInputNumberComponent,
	GarSelectComponent,
	GarToggleComponent
]

const _PIPES = [
	PriceFormatPipe,
	SelectionByPropertyPipe
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
		InputTextModule,
		DropdownModule
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
