import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "edit-ready-business",
    templateUrl: "./edit-ready-business.component.html",
    styleUrls: ["./edit-ready-business.component.scss"]
})

export class EditReadyBusinessModule implements OnInit {
    
    constructor(private http: HttpClient, private commonService: CommonDataService) {

    };

    public async ngOnInit() {
        
    };
}