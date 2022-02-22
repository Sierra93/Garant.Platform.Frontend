import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/core-urls/api-url';

@Injectable()
export class ConfiguratorService {
    private readonly api = API_URL.apiUrl;

    constructor(private readonly http: HttpClient) { }

    public async onRejectFranchiseCardAsync(cardId: number, cardType: string, comment: string) {
        try {
            return new Promise(async resolve => {
                return await this.http.get(this.api + '/configurator/reject-card?cardId=' + cardId
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
}