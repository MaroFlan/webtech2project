import { Component, OnInit } from '@angular/core';
import { RestService } from '../angular/rest.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'wt2-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  private registerResponse;


  constructor(private restService: RestService, private router: Router) { }

  ngOnInit(): void {
  }

  register(uName: string, pWord1: string, pWord2: string, email: string, fName: string, lName: string ): void {
        if (pWord1 === pWord2){


          // lege User an
         // weise eingegebene account daten zu

          var user: User = {
            username : uName,
            email: email,
            password: pWord1,
            firstname: fName,
            lastname: lName,
            roles: null,
            id: null,
          }


         // füge Userdaten der Datenbank hinzu und navigiere bei success auf login

          this.restService.register(user).subscribe(response => {
            this.registerResponse = response;
            if (response){
              this.router.navigate(['/login']); //nav funktioniert noch nicht
            }else {
              alert(response);
            }
          });
          }
        else
        {
          alert("Passwords did not match");
          return;
        }


  }
}
