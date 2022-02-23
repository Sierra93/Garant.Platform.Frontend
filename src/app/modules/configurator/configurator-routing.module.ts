import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguratorAdminModule } from './components/configurator-admin/configurator-admin.component';

const routes: Routes = [
    { path: '', component: ConfiguratorAdminModule },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfiguratorRoutingModule {}
