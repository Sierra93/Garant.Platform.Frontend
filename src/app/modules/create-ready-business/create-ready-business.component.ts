import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "create-ready-business",
    templateUrl: "./create-ready-business.component.html",
    styleUrls: ["./create-ready-business.component.scss"]
})

export class CreateReadyBusinessModule implements OnInit {
    
    constructor(private http: HttpClient, private commonService: CommonDataService) {

    };

    public async ngOnInit() {
        
    };
}