import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../news';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseNewsService } from '../base-news.service';
import { environment as env } from '../../environments/environment';
import {User} from '../user';

@Injectable()
export class NewsService extends BaseNewsService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Observable<News[]> {
    return this.http.get<any[]>(`${env.apiUrl}/news`, {headers: this.defaultHeaders}).pipe(
      map(body => body.map(n => News.fromObject(n)))
    );
  }

  getNewest(): Observable<News> {
    return this.http.get<any>(`${env.apiUrl}/news/newest`, {headers: this.defaultHeaders}).pipe(
      map(body => News.fromObject(body))
    );
  }

  create(headline: string, content: string): Observable<News> {
    return this.http.post<any>(`${env.apiUrl}/news`, {headline, content}, {headers: this.defaultHeaders}).pipe(
      map(body => News.fromObject(body))
    );
  }

  delete(id: number): Observable<News> {
      return this.http.delete<any>(`${env.apiUrl}/news/${id}`, {headers: this.defaultHeaders}).pipe(
        map(body => News.fromObject(body))
      );
    }

    update(headline: string, content: string, id: number): Observable<News> {
        return this.http.put<any>(`${env.apiUrl}/news/${id}`, {headline, content}, {headers: this.defaultHeaders}).pipe(
          map(body => News.fromObject(body))
        );
      }

    //---------------ab hier user methoden-------------(firstname: string, lastname: string, email: string, username: string, password: string)
      /*register(user: User): Observable<User> { //link wahrscheinlich nicht ganz korrekt
                return this.http.post<any>(`http://localhost:4200/rest/simple`, {user}, {headers: this.defaultHeaders}).pipe(
                  map(body => user)
                );
              }*/

      register(user: User): Observable<any>{
          return this.http.post(`http://localhost:4200/rest/simple`, user);

        }
}
