import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment as env } from '../../environments/environment';
import { User } from '../user';


@Injectable()
export class JwtAuthService extends AuthService {
  private token: string;

  private currentUser : User | undefined;
    private currentUsername : string | undefined;

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this.getBaseUrl()}/authenticate`, {username, password}, {responseType: 'text'})
      .pipe(map(body => {
        this.token = body;
        return true;
      }));
  }

  logout(): Observable<boolean> {
    this.token = null;
    return of(true);
  }

  getAuthHeaders(): HttpHeaders {
    return this.token == null ? new HttpHeaders() : new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    });
  }

  getBaseUrl(): string {
    return `${env.apiUrl}/auth/jwt`;
  }

  getCurrentUsername(): string {
      return this.currentUsername;
    }

     //-------Speicher usernamen durch einen post ab und hole mit get wieder-------
      saveCurrentUsername(username: string): Observable<any>  {
      return this.http.post('${this.getBaseUrl()}/current', username);
      }

      findCurrentUserAndGet(): Observable<any> {
        return this.http.get('${this.getBaseUrl()}/current');
      }


  get isLoggedIn(): boolean {
    return this.token != null;
  }
}
