import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { User } from '../user';

@Injectable()
export class BasicAuthService extends AuthService {

  private token: string;
  private currentUser : User | undefined;
  private currentUsername : string | undefined;

  login(username: string, password: string): Observable<boolean> {
    const token = btoa(unescape(encodeURIComponent(username + ':' + password)));

    this.currentUsername = username; //speichert currentUsername ab
    console.log(this.currentUsername);
    this.saveCurrentUsername(this.currentUsername); //speicher currentUsername in datenbank irgendwo ab

    return this.http.head(`${this.getBaseUrl()}/profile`, {headers: this.getAuthHeadersForToken(token), responseType: 'text'})
        .pipe(map(body => {
          this.token = token;
          return true;
        }));
  }


  //--------Speicher diesen username in den nachrichten ab----------------
  getCurrentUsername(): string { //funktioniert nicht korrekt
    console.log('testtesttest');
    console.log(this.currentUsername);
    return this.currentUsername;
  }

  //-------Speicher usernamen durch einen post ab und hole mit get wieder-------
  saveCurrentUsername(username: string): Observable<any>  {
  return this.http.post(`${this.getBaseUrl()}/current`, username, {headers: this.getAuthHeadersForToken(this.token), responseType: 'json'});
  }

  findCurrentUserAndGet(): Observable<any> { //find way to map an observable to a string
    return this.http.get<any>(`${this.getBaseUrl()}/current`, {headers: this.getAuthHeadersForToken(this.token), responseType: 'json'});//.pipe( map ( (currentUsername) => {this.currentUsername = currentUsername }) );
  }



  //----------------

  logout(): Observable<boolean> {
    this.token = null;
    document.cookie = "";
    return of(true);
  }

  getAuthHeaders(): HttpHeaders {
    return this.getAuthHeadersForToken(this.token);
  }

  getAuthHeadersForToken(token: string): HttpHeaders {
    return token == null ? new HttpHeaders() : new HttpHeaders({
      "Authorization": `Basic ${token}`
    });
  }

  getBaseUrl(): string {
    return `${env.apiUrl}/auth/basic`;
  }

  get isLoggedIn(): boolean {
    return this.token != null;
  }
}
