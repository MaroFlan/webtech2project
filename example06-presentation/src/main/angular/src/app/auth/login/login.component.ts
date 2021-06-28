import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wt2-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  constructor(private router: Router) { }


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

        () => {this.loggedIn.emit();
        this.router.navigate(['/']).then(() => { this.router.navigate(['/angular']); }) //bei succesful login wird auf msg page weitergeleitet
        },
        () => this.errorMessage = "Failed to login"
      );
    }
  }
}

