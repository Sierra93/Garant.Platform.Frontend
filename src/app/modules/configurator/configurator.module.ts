import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorRoutingModule } from './ad-routing.module';
import { ConfiguratorAdminModule } from './configurator-admin/components/configurator-admin.component';
import { ConfiguratorService } from './services/configurator.service';
import { TableModule } from 'primeng/table';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { GalleriaModule } from 'primeng/galleria';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';

@NgModule({
    declarations: [ConfiguratorAdminModule],
    imports: [ CommonModule, CheckboxModule, DropdownModule, FormsModule, ReactiveFormsModule, ConfiguratorRoutingModule, TableModule, InputTextareaModule, GalleriaModule, ButtonModule, TabViewModule, ToastModule ],
    exports: [],
    providers: [ConfiguratorService],
})

export class ConfiguratorModule {}