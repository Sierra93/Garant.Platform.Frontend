import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";

@Component({
    selector: "profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})

/** 
 * Класс модуля профиля пользователя.
 */
export class ProfileModule implements OnInit {    
    lastName: string = "";
    firstName: string = "";
    patr: string = "";
    dateYearBirth: string = "";
    email: string = "";
    phone: string = "";
    inn: number = 0;
    pc: number = 0;
    serial: number = 0;
    number: number = 0;
    dateGive: string = "";
    whoGive: string = "";
    code: string = "";
    registerAddress: string = "";

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private titleService: Title) {
        
    };

    public ngOnInit() {
        
    };  
}