import { Component, EventEmitter, Output } from '@angular/core';
import { NewsService } from '../news.service';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { SessionAuthService } from '../../auth/session-auth.service';
import { AuthComponent } from '../../auth/auth.component';
import { User } from '../../user';
import { BasicAuthService } from '../../auth/basic-auth.service';
import * as bcrypt from 'bcryptjs';

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


    //this.currentUsername = document.cookie;

    //extrahiere Usernamen aus dem Cookie
    const cookie = document.cookie.split(',');
    const username = cookie[0];
    const hash = cookie[1];

    //ist immer true AUßER jemand ändert den Cookie Inhalt oder der Cookie wurde bspw invalidiert
    if(bcrypt.compareSync(username, hash) ){this.currentUsername = username;}
    else{this.errorMessage = 'invalid cookie'; return }

    //console.log(username);
    //console.log(hash);



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
