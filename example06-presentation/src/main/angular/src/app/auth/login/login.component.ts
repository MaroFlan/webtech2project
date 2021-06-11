import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'wt2-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  @Input()
  public authService: AuthService;

  @Output()
  public loggedIn = new EventEmitter<void>();

  public username: string = "";
  public password: string = "";
  public errorMessage: string;

  login(e: Event) {
    e.preventDefault();
    this.errorMessage = null;
    if (this.username.trim() !== "" && this.password.trim() !== "") {
      this.authService.login(this.username, this.password).subscribe(
        () => this.loggedIn.emit(),
        () => this.errorMessage = "Failed to login"
      );
    }
  }
}
