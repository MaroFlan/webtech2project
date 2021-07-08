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

  create(headline: string, content: string, username: string): Observable<News> {
    return this.http.post<any>(`${env.apiUrl}/news`, {headline, content, username}, {headers: this.defaultHeaders}).pipe(
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


      register(user: User): Observable<any>{
          return this.http.post(`http://localhost:4200/rest/simple`, user); //vllt link vereinheitlichen
        }



    /*
      getUser(username: string): Observable<User>{

        return this.http.get('http://localhost:4200/rest/simple/' + username)
          .map((data: {user: User}) => data.user;
      }
    */

    /*
        edit(user: User, username: string): Observable<any>{ //user besitzt neue infos, username ist der (womöglich alte) username
                  return this.http.put(`http://localhost:4200/rest/simple/` + username, user); //vllt link vereinheitlichen

                }
    */


}
