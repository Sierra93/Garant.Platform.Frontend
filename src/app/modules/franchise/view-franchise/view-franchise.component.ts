import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { GetFranchiseInput } from "src/app/models/franchise/input/get-franchise-input";
import { FranchiseOutput } from "src/app/models/franchise/output/franchise-output";
import { CommonDataService } from "src/app/services/common-data.service";

@Component({
    selector: "view-franchise",
    templateUrl: "./view-franchise.component.html",
    styleUrls: ["./view-franchise.component.scss"]
})

/** 
 * Класс модуля просмотра франшизы.
 */
export class ViewFranchiseModule implements OnInit {    
    franchiseId: number = 0;
    franchiseData: any = [];
    routeParam: any;
    aInvestInclude: any[] = [];
    aFinIndicators: any[] = [];
    isHidePacks: boolean = false;
    aPacks: any = [];
    aFranchisePhotos: any[] = [];
    responsiveOptions: any;
    aNamesFranchisePhotos: any = [];
    fio: string = "";
    trainingDetails: string = "";

    constructor(private http: HttpClient, 
        private commonService: CommonDataService,
        private route: ActivatedRoute) {
            this.routeParam = this.route.snapshot.queryParams;
            this.franchiseId = this.route.snapshot.queryParams.franchiseId;

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
        await this.getTransitionAsync();
    };    

    private async getTransitionAsync() {
        try {
            let franchiseId = this.franchiseId;

            await this.commonService.getTransitionAsync().then((data: any) => {
                console.log("Переход получен:", data);
                this.getViewFranchiseAsync(franchiseId);
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит данные франшизы, которую просматривают.
     * @returns - данные франшизы.
     */
    private async getViewFranchiseAsync(franchiseId: number) {
        try {                     
            console.log("getViewFranchiseAsync");        
            let getFranchiseInput = new GetFranchiseInput();
            getFranchiseInput.FranchiseId = franchiseId;
            getFranchiseInput.Mode = "View";           

            await this.http.post(API_URL.apiUrl.concat("/franchise/get-franchise"), getFranchiseInput)
                .subscribe({
                    next: (response: any) => {
                        console.log("Полученная франшиза:", response);
                        this.franchiseData = response;                          
                        this.aNamesFranchisePhotos = [this.franchiseData.url];                        
                        this.aInvestInclude = [JSON.parse(response.investInclude)];
                        this.aFinIndicators = [JSON.parse(response.finIndicators)];
                        this.aPacks = [JSON.parse(response.franchisePacks)];
                        this.fio = response.fullName;

                        console.log("franchiseData", this.franchiseData);    
                        console.log("aInvestInclude", this.aInvestInclude);
                        console.log("aFinIndicators", this.aFinIndicators);
                        console.log("aPacks", this.aPacks);
                        console.log("aNamesFranchisePhotos", this.aNamesFranchisePhotos);
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