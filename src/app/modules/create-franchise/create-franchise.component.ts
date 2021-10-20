import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "create-franchise",
    templateUrl: "./create-franchise.component.html",
    styleUrls: ["./create-franchise.component.scss"]
})

export class CreateFranchiseModule implements OnInit {
    constructor(private http: HttpClient, private commonService: CommonDataService) {

    };

    public async ngOnInit() {
        
    };

    public async fileChange(event: any) {
        let fileList = event.target.files;
        let file: File = fileList[0];
        let formData: FormData = new FormData();
        formData.append('fff', file);

        await this.http.post(API_URL.apiUrl.concat("/franchise/create-franchise"), formData)
            .subscribe({
                next: (response: any) => {
                    console.log("form file", response);
                },

                error: (err) => {
                    this.commonService.routeToStart(err);
                    throw new Error(err);
                }
            });
    }
}