import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorRoutingModule } from './configurator-routing.module';
import { ConfiguratorService } from './services/configurator.service';
import { TableModule } from 'primeng/table';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { GalleriaModule } from 'primeng/galleria';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import { ConfiguratorAdminModule } from './components/configurator-admin/configurator-admin.component';

@NgModule({
    declarations: [ConfiguratorAdminModule],
    imports: [ CommonModule, CheckboxModule, DropdownModule, FormsModule, ReactiveFormsModule, ConfiguratorRoutingModule, TableModule, InputTextareaModule, GalleriaModule, ButtonModule, TabViewModule, ToastModule, DialogModule ],
    exports: [],
    providers: [ConfiguratorService],
})

export class ConfiguratorModule {}