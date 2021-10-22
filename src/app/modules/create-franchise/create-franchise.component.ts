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
    name?: string;
    responsiveOptions: any;
    aNamesFranchisePhotos: any = [];
    aFiles: any[] = [];

    constructor(private http: HttpClient, private commonService: CommonDataService) {        
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
    };

    public async ngOnInit() {
        
    };

    // public async fileChange(event: any) {
    //     let fileList = event.target.files;
    //     let file: File = fileList[0];
    //     let formData: FormData = new FormData();
    //     formData.append('files', file);

    //     await this.http.post(API_URL.apiUrl.concat("/franchise/temp-file"), formData)
    //         .subscribe({
    //             next: (response: any) => {
    //                 console.log("form file", response);
    //             },

    //             error: (err) => {
    //                 this.commonService.routeToStart(err);
    //                 throw new Error(err);
    //             }
    //         });
    // };

    onBasicUpload(event: any) {

    };

    public async uploadFranchisePhotosAsync(event: any) {
        try {
            let fileList = event.target.files;
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('files', file);

            await this.http.post(API_URL.apiUrl.concat("/franchise/temp-file"), formData)
                .subscribe({
                    next: (response: any) => {
                        console.log("Загруженные файлы франшизы:", response);
                        this.aNamesFranchisePhotos = response;
                    },

                    error: (err) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };
}