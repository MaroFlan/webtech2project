import { Component, EventEmitter, Output } from '@angular/core';
import { NewsService } from '../news.service';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { SessionAuthService } from '../../auth/session-auth.service';
import { AuthComponent } from '../../auth/auth.component';
import { User } from '../../user';
import { BasicAuthService } from '../../auth/basic-auth.service';

@Component({
  selector: 'wt2-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.sass'],
  providers: [NewsService]
})
export class CreateNewsComponent {

  authComponent : AuthComponent;

 // public currentUser: User;
 //public authService: AuthService;

  @Output()
  public created = new EventEmitter();

  public headline: string = "";
  public content: string = "";
  public errorMessage: string;
  public userId: number;
  public currentUsername: string;

  constructor(private newsService: NewsService, private basicAuthService: BasicAuthService//private newsService: NewsService, private authService: AuthService//private basicAuthService: BasicAuthService
  ) { }

  public createNews(e: Event): void {
    e.preventDefault();
    this.errorMessage = null;

    //-----somehow get the current username and save it on the messageOfHope
    //console.log('1');
    //this.currentUsername = this.basicAuthService.findCurrentUserAndGet(); //aufruf returned observable, dieser muss auf string gemappt werden

    //this.basicAuthService.findCurrentUserAndGet().subscribe({ next: (activeUser) => this.currentUsername = activeUser }); //aufruf returned aktuell noch ein Unauthorized
    //console.log(this.currentUsername);          //aufruf beim service evtl an dem auth-newsService orientieren
    //console.log('2');
    this.currentUsername = document.cookie; //solange der Unauthorized da ist, beispielUser für Testzwecke setzen
                      //->sobald methodenaufruf funktioniert, ist die Anforderung damit komplett implementiert



        if (this.headline.trim() != null && this.content.trim() != null) {
          this.newsService.create(this.headline, this.content, this.currentUsername).subscribe(
            () => {
              this.created.emit();
              this.headline = "";
              this.content = "";
            },
            () => this.errorMessage = 'Could not create news'
          );
        }
  //  }
  //  else{
  //    this.errorMessage = 'Not logged in'
  //  }
  }

  getCharsLeft(): number {
    return 255 - this.content.length;
  }
}
