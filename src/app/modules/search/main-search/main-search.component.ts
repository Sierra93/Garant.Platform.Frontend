import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";

@Component({
    selector: "main-search",
    templateUrl: "./main-search.component.html",
    styleUrls: ["./main-search.component.scss"]
})

/** 
 * Класс модуля поиска.
 */
export class MainSearchModule implements OnInit {
    searchType: string;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private titleService: Title) {
        this.searchType = this.route.snapshot.queryParams.searchType;

        if (this.searchType == "Franchise") {
            this.titleService.setTitle("Gobizy: Страница поиска по франшизам");
        }        
        
        if (this.searchType == "Business") {
            this.titleService.setTitle("Gobizy: Страница поиска по бизнесу");
        }   
    };

    public async ngOnInit() {

    };
}