import { Injectable } from '@angular/core';
import { BaseNewsService } from '../base-news.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../news';
import { map } from 'rxjs/operators';
import { BasicAuthService } from './basic-auth.service';
import { AuthService } from './auth.service';
import {User} from '../user';
import { updateShorthandPropertyAssignment } from 'typescript';


@Injectable()
export class AuthNewsService extends BaseNewsService {

  private _authService: AuthService;
  authUrl = "http://localhost:4200/api/auth/";
  maybeUrl = "http://localhost:4200/rest/simple";
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

  create(headline: string, content: string, username: string): Observable<News> {
    return this.http.post<any>(`${this._authService.getBaseUrl()}/news`, {headline, content, username}, {headers: this._authService.getAuthHeaders()}).pipe(
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
  
  getNews(id: number): Observable<News> {
    return this.http.get<any>(`${this._authService.getBaseUrl()}/news/${id}`, {headers: this._authService.getAuthHeaders()}).pipe(
      map(body => News.fromObject(body))
    );
  }

  getAuthor(id: number): Observable<string> {
    return this.http.get<News>(`${this._authService.getBaseUrl()}/news/${id}/news/${id}`, {headers: this._authService.getAuthHeaders()}).pipe(
      map(news => news.username as string),
    );
  }

  set authService(value: AuthService) {
    this._authService = value;
  }


  //---------------ab hier user methoden-------------(firstname: string, lastname: string, email: string, username: string, password: string)
  register(user: User): Observable<User> {
            return this.http.post<any>(`${this._authService.getBaseUrl()}/rest/simple`, {user}, {headers: this.defaultHeaders}).pipe(
              map(body => user)
            );
          }




}
