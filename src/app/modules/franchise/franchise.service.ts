import {Injectable} from '@angular/core';
import {franchise} from "./franchise";
import {Observable} from "rxjs";
import {API_URL} from "../../core/core-urls/api-url";
import {HttpParams, HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FranchiseService {

  constructor(
    private _http: HttpClient
  ) {
  }

  getFranchise(franchiseId: number): Observable<franchise.IItem> {
    const params = new HttpParams().set('franchiseId', `${franchiseId}`);
    return this._http.get<franchise.IItem>(`${API_URL.apiUrl}/franchise/get-franchise`, {params})
  }
}
