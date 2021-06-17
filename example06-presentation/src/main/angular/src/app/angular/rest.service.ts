import { Injectable, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of, Subject, throwError} from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class RestService implements OnInit {

  public loggedIn: boolean = false;

  private user: User = null;

  constructor(private http: HttpClient) { }

  private loginUrl = '/login.jsp';

  private accountUrl = '/rest/user/profile';

  private logoutUrl = '/logout';

  signInChange: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.get_current_user().subscribe(user => {
      this.loggedIn = true;
      this.user = user;
      this.signInChange.next(this.loggedIn);
    });
  }

  login(username: string, password: string): Observable<boolean> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(this.loginUrl, body.toString(), {headers, responseType: 'text'}).pipe(
      map(() => {
        this.get_current_user().subscribe(user => {
            this.loggedIn = true;
            this.user = user;
            this.signInChange.next(this.loggedIn);
        });
        return true;
      })
    );
  }

  logout(): Observable<boolean> {
    return this.http.get(this.logoutUrl).pipe(
      catchError(err => {
        return err.status == 0 ? of([]) : throwError(err);
      }),
      map(() => {
        this.loggedIn = false;
        this.user = null;
        this.signInChange.next(this.loggedIn);
        return true;
      })
    );
  }

  register(user: User): Observable<any>{
    return this.http.post(this.accountUrl, user);

  }

  get_current_user(): any {
      return this.http.get<User>(this.accountUrl);
  }

  getCachedUser(): User {
    return this.user;
  }
}
