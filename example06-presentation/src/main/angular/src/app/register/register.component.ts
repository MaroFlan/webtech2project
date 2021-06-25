import { Component, OnInit } from '@angular/core';
//import { RestService } from '../angular/rest.service';
import { User } from '../user'; //vllt import nicht richtig, falscher user
import { Router } from '@angular/router';
import { NewsService } from '../angular/news.service';

@Component({
  selector: 'wt2-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  providers: [NewsService]
})

export class RegisterComponent implements OnInit {

  private registerResponse;

  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit(): void {
  }

  register(uName: string, pWord1: string, pWord2: string, email: string, fName: string, lName: string ): void {
        if (pWord1 === pWord2){

        console.log(uName)
        console.log(pWord1)
        console.log(email)
        console.log(fName)
        console.log(lName)

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

          this.newsService.register(user).subscribe(response => {
            this.registerResponse = response;
            if (response){
              this.router.navigate(['/auth']); //nav funktioniert noch nicht
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


    /* ----referenz
    public updateNews(e: Event): void {


                  this.newsService.update(this.headline, this.content, db_id).subscribe(
                    () => {
                      this.updated.emit();
                     // this.headline = "";
                   //   this.content = "";
                      this.router.navigate(['/']).then(() => { this.router.navigate(['/angular' ]); }) // chad fucking redirect (kill me now)
                    },
                    () => console.log("Error while updating")
                  );
        }*/
  }
}


