import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularComponent } from './angular/angular.component';
import { AuthComponent } from './auth/auth.component';
import { CreateNewsComponent } from './angular/create-news/create-news.component';
import { NewsDetailsComponent } from './angular/news-details/news-details.component';
//import { CreateNewsSecurityComponent } from './security/create-news-security/create-news-security.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateNewsAuthComponent } from './auth/create-news-auth/create-news-auth.component';
import { NewsListComponent } from './angular/news-list/news-list.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './angular/account/account.component';
import { NotloggedComponent } from './angular/not-logged-news/not-logged.component';

import { AuthService } from './auth/auth.service';
import { BasicAuthService } from './auth/basic-auth.service';


@NgModule({
  declarations: [
    AppComponent,
    AngularComponent,
    AuthComponent,
    CreateNewsComponent,
  //  CreateNewsSecurityComponent,
    CreateNewsAuthComponent,
    NewsDetailsComponent,
    LoginComponent,
    NewsListComponent,
    RegisterComponent,
    AccountComponent,
    NotloggedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpClientModule, BasicAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
