import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogFranchiseService {
  private apiUrl = env.apiUrl

  constructor(private _http: HttpClient) {
  }

  getPaginationCatFran(pageNumber: number, countRows: number): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}/${env.api.pagination}/${env.api.initCatalogFranchise}`,{ pageNumber, countRows});
  }
}
