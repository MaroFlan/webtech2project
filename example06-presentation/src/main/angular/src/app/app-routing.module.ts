import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularComponent } from './angular/angular.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './angular/account/account.component';

const routes: Routes = [
  { path: 'angular', component: AngularComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'account', component: AccountComponent},
  { path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
