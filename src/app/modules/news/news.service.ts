import { Injectable } from '@angular/core';
import { API_URL } from "../../core/core-urls/api-url";
import { HttpClient } from "@angular/common/http";
import { news } from "./news";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

/**
 * Сервис новостей
 *
 * TODO: перенести из компонентов методы получения данных в сервис
 * */
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
      private _http: HttpClient
  ) { }
  
  /**
   * Получение новостей для блока новостей
   * */
  getBlogNews(): Observable<news.INewsBlockItem[]> {
    return this._http.post<news.INewsBlockItem[]> (API_URL.apiUrl.concat("/blog/get-news"), {}).pipe(
        tap(response => console.log('Список новостей:', response))
    )
  }
  
}
