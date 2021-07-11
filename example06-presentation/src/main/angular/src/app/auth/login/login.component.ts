import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'wt2-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  constructor(private router: Router) { }

  //salt
  public salt: string = bcrypt.genSaltSync(10);



  @Input()
  public authService: AuthService;

  @Output()
  public loggedIn = new EventEmitter<void>();

  public username: string = "";
  public password: string = "";
  public errorMessage: string;

  login(e: Event): void {
    e.preventDefault();
    this.errorMessage = null;
    if (this.username.trim() !== "" && this.password.trim() !== "") {
      this.authService.login(this.username, this.password).subscribe(

        () => {
        //hash
        document.cookie = this.username + "," + bcrypt.hashSync(this.username, this.salt);
        console.log(document.cookie);
          //document.cookie = this.username;
          this.loggedIn.emit();
          this.router.navigate(['/']).then(() => { this.router.navigate(['/auth']); }) //bei succesful login wird auf msg page weitergeleitet
        },
        () => this.errorMessage = "Failed to login"
      );
    }
  }
}

