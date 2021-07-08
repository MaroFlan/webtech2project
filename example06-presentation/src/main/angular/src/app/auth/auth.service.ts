import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
             providedIn: 'root',
           })
export abstract class AuthService {


  constructor(protected http: HttpClient) {
  }

  abstract login(username: string, password: string): Observable<boolean>;

  abstract logout(): Observable<boolean>;

  abstract getAuthHeaders(): HttpHeaders;

  abstract getBaseUrl(): string;

  abstract getCurrentUsername(): string;

  abstract saveCurrentUsername(username: string): Observable<any> ;

  abstract findCurrentUserAndGet(): Observable<any> ;

  abstract get isLoggedIn(): boolean;


}



