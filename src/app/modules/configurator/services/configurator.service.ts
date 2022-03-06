import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL } from 'src/app/core/core-urls/api-url';
import { CreateCategoryInput } from 'src/app/models/configurator/input/create-category-input';
import { CreateSphereInput } from 'src/app/models/configurator/input/create-sphere-input';

@Injectable()
export class ConfiguratorService {
    public readonly notAcceptedBusinesses$ = new BehaviorSubject<any>(undefined);
    public readonly createdSphere$ = new BehaviorSubject<any>(undefined);

    constructor(private readonly http: HttpClient) { }

    public async onRejectCardAsync(cardId: number, cardType: string, comment: string) {
        try {
            return new Promise(async resolve => {
                return await this.http.get(API_URL.apiUrl + '/configurator/reject-card?cardId=' + cardId
                    + "&cardType=" + cardType
                    + "&comment=" + comment)
                    .subscribe({
                        next: (response: any) => {
                            resolve(response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            })
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    public getNotAcceptedBusinesses() {
        console.log("getNotAcceptedBusinesses");
        return this.http.post(API_URL.apiUrl + '/configurator/businesses-not-accepted', {}).pipe(
            tap(data => this.notAcceptedBusinesses$.next(data))
        );
    };

    /**
     * Функция создаст сферу.
     * @param sphereName 
     * @param sphereType 
     * @param sysName 
     * @returns 
     */
    public createSphereAsync(sphereName: string, sphereType: string, sysName: string) {
        let modelInput = new CreateSphereInput();
        modelInput.SphereName = sphereName;
        modelInput.SphereType = sphereType;
        modelInput.SysName = sysName;

        try {
            return new Promise(async resolve => {
                return await this.http.post(API_URL.apiUrl + "/configurator/create-sphere", modelInput)
                    .subscribe({
                        next: (response: any) => {
                            resolve(response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            })
        }

        catch (e: any) {
            throw new Error(e);
        }
    };   

    /**
     * Функция создаст категорию.
     * @param sphereName 
     * @param sphereType 
     * @param sysName 
     * @returns 
     */
     public createCategoryAsync(categoryCode: string, sphereName: string, sphereType: string, sysName: string) {
        let modelInput = new CreateCategoryInput();
        modelInput.CategoryName = sphereName;
        modelInput.CategoryType = sphereType;
        modelInput.SysName = sysName;
        modelInput.SphereCode = categoryCode;

        try {
            return new Promise(async resolve => {
                return await this.http.post(API_URL.apiUrl + "/configurator/create-category", modelInput)
                    .subscribe({
                        next: (response: any) => {
                            resolve(response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            })
        }

        catch (e: any) {
            throw new Error(e);
        }
    };  
}