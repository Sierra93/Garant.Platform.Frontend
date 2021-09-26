import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonDataService } from 'src/app/services/common-data.service';
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'header',
    templateUrl: './header.html',
    styleUrls: ['./header.scss']
})
export class HeaderModule implements OnInit {
    aHeader: any[] = [];

    constructor(private http: HttpClient, 
        private commonService: CommonDataService,
        private titleService: Title) {
    }

    public async ngOnInit() {       
       await this.initHeaderAsync();
    };

     /**
     * Функция получит поля хидера.
     */
    public async initHeaderAsync() {
        try {
            await this.commonService.initHeaderAsync("Main").then((data: any) => {
                this.aHeader = data;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };
}
