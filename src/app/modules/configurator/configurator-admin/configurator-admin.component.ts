import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "configurator-admin",
    templateUrl: "./configurator-admin.component.html",
    styleUrls: ["./configurator-admin.component.scss"]
})

/** 
 * Класс модуля конфигуратора (панель).
 */
export class ConfiguratorAdminModule implements OnInit {
    items: any[] = [
        { label: 'Home', icon: 'pi pi-fw pi-home', header: 'Header 1' },
        { label: 'Calendar', icon: 'pi pi-fw pi-calendar', header: 'Header 2' },
        { label: 'Edit', icon: 'pi pi-fw pi-pencil', header: 'Header 3' },
        { label: 'Documentation', icon: 'pi pi-fw pi-file', header: 'Header 4' },
        { label: 'Settings', icon: 'pi pi-fw pi-cog', header: 'Header 5' }
    ];;

    public async ngOnInit() {

    };
}