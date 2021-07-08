import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthNewsService } from './auth-news.service';
import { AngularComponent } from '../angular/angular.component';
import { BasicAuthService } from './basic-auth.service';
import { AuthService } from './auth.service';
import { SessionAuthService } from './session-auth.service';

@Component({
  selector: 'wt2-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
  providers: [AuthNewsService]
})
export class AuthComponent extends AngularComponent implements OnInit {

  authService: AuthService;

  constructor(private http: HttpClient,
              private authNewsService: AuthNewsService) {
    super(authNewsService);
    this.useBasicAuth();
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe();
    this.news = [];
    this.latest = null;
  }

  useBasicAuth(e?: Event) {
    if (e != null) e.preventDefault();
    this.authService = new BasicAuthService(this.http);
    this.authNewsService.authService = this.authService;
    console.log('basicAuth was used ' + this.authService + ' ||| ' + this.authNewsService)
  }



  useSessionAuth(e?: Event) {
    if (e != null) e.preventDefault();
    this.authService = new SessionAuthService(this.http);
    this.authNewsService.authService = this.authService;
  }

  isBasicAuth(): boolean {
    return this.authService instanceof BasicAuthService;
  }


  isSessionAuth(): boolean {
    return this.authService instanceof SessionAuthService;
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}
