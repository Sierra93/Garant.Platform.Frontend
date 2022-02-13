import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAdComponent } from './components/create-ad/create-ad.component';
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdService } from './services/ad.service';
import { AdRoutingModule } from './ad-routing.module';

@NgModule({
    declarations: [CreateAdComponent],
    imports: [ CommonModule, CheckboxModule, DropdownModule, FormsModule, ReactiveFormsModule, AdRoutingModule ],
    exports: [],
    providers: [AdService],
})
export class AdModule {}