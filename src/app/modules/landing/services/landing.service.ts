import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-url';

@Injectable()
export class LandingRequestService {
    public readonly landingRequestNotify$ = new BehaviorSubject<any>(undefined);

    constructor(private readonly http: HttpClient) { }

    public sendLandingRequestAsync(name: string, phoneNumber: string, landingType: string) {
        try {
            return this.http.get(API_URL.apiUrl + "/request/send-landing-request?name=" + name
                + "&phoneNumber=" + phoneNumber + "&landingType=" + landingType);
        }

        catch (e: any) {
            throw new Error(e);
        }
    };
}