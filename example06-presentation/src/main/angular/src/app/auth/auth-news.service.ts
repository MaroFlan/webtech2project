import { Injectable } from '@angular/core';
import { BaseNewsService } from '../base-news.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../news';
import { map } from 'rxjs/operators';
import { BasicAuthService } from './basic-auth.service';
import { AuthService } from './auth.service';


@Injectable()
export class AuthNewsService extends BaseNewsService {

  private _authService: AuthService;
  authUrl = "http://localhost:4200/api/auth/";
      //rest/auth



  constructor(http: HttpClient) {
    super(http);
    this._authService = new BasicAuthService(http);
  }

  getAll(): Observable<News[]> {
    return this.http.get<any[]>(`${this._authService.getBaseUrl()}/news`, {headers: this._authService.getAuthHeaders()}).pipe(
      map(body => body.map(n => News.fromObject(n)))
    );
  }

  getNewest(): Observable<News> {
    return this.http.get<any>(`${this._authService.getBaseUrl()}/news/newest`, {headers: this._authService.getAuthHeaders()}).pipe(
      map(body => News.fromObject(body))
    );
  }

  create(headline: string, content: string): Observable<News> {
    return this.http.post<any>(`${this._authService.getBaseUrl()}/news`, {headline, content}, {headers: this._authService.getAuthHeaders()}).pipe(
      map(body => News.fromObject(body))
    );
  }

  delete(id: number): Observable<News> {
        return this.http.delete<any>(`${this._authService.getBaseUrl()}/news/${id}`, {headers: this.defaultHeaders}).pipe(
          map(body => News.fromObject(body))
        );
      }

  update(headline: string, content: string, id: number): Observable<News> {
          return this.http.put<any>(`${this._authService.getBaseUrl()}/news/${id}`, {headline, content}, {headers: this.defaultHeaders}).pipe(
            map(body => News.fromObject(body))
          );
        }

  set authService(value: AuthService) {
    this._authService = value;
  }

/*
    login(model: any) {
      return this.http.post(`${this._authService.getBaseUrl()}/news`).pipe(
        map((response: any) => {
          const user = response;
          if (user.result.succeeded) {
            localStorage.setItem('token', user.token);
          }
        })
      )
    } */
}
