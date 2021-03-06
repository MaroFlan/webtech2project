import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment as env } from '../../environments/environment';
import { User } from '../user';


@Injectable()
export class SessionAuthService extends AuthService {
  private loggedIn: boolean = false;

  private currentUser : User | undefined;
    private currentUsername : string | undefined;

  login(username: string, password: string): Observable<boolean> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(`/login.jsp`, body.toString(), {headers, responseType: 'text'}).pipe(
      map(() => {
        this.loggedIn = true;
        return true;
      })
    );
  }

  logout(): Observable<boolean> {
    return this.http.get(`/logout`).pipe(
      catchError(err => {
        return err.status == 0 ? of([]) : throwError(err);
      }),
      map(() => {
        this.loggedIn = false;
        return true;
      })
    );
  }

  getCurrentUsername(): string {
      console.log('sss');
      return this.currentUsername;
    }

     //-------Speicher usernamen durch einen post ab und hole mit get wieder-------
      saveCurrentUsername(username: string): Observable<any>  {
      return this.http.post('${this.getBaseUrl()}/current', username);
      }

      findCurrentUserAndGet(): Observable<any> {
        return this.http.get('${this.getBaseUrl()}/current');
      }



  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders();
  }

  getBaseUrl(): string {
    return `${env.apiUrl}/auth/session`
  }

  get isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
