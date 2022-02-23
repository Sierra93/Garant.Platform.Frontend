import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL } from "../../core/core-urls/api-url";

/**
 * Сервис документов.
 */
@Injectable()
export class DocumentService {
    constructor(private http: HttpClient) {

    }

     /**
     * Функция скачает файл.
     * @param fileName - Имя файла.
     */
    public async downloadFileAsync(fileName: string) {
        try {
            return new Promise(async resolve => {
                await this.http.get(API_URL.apiUrl.concat("/document/download?fileName=" + fileName), { observe: 'response', responseType: 'blob'})
                    .subscribe({
                        next: (response: any) => {
                            console.log("download file: ", response);

                            const a = document.createElement('a');
                            a.setAttribute('type', 'hidden');
                            a.href = URL.createObjectURL(response.body);
                            a.download = fileName;
                            a.click();
                            a.remove();

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
};