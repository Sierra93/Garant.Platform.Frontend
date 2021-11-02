import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "view-ready-business",
    templateUrl: "./view-ready-business.component.html",
    styleUrls: ["./view-ready-business.component.scss"]
})

export class ViewReadyBusinessModule implements OnInit {
    
    constructor(private http: HttpClient, private commonService: CommonDataService) {

    };

    public async ngOnInit() {
        
    };
}