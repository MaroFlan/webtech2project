import { Component, EventEmitter, Output } from '@angular/core';
import { NewsService } from '../news.service';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { SessionAuthService } from '../../auth/session-auth.service';
import { AuthComponent } from '../../auth/auth.component';
import { User } from '../../user';
//import { BasicAuthService } from '../../auth/basic-auth.service';

@Component({
  selector: 'wt2-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.sass'],
  providers: [NewsService]
})
export class CreateNewsComponent {

  authComponent : AuthComponent;

 // public currentUser: User;

  @Output()
  public created = new EventEmitter();

  public headline: string = "";
  public content: string = "";
  public errorMessage: string;
  public userId: number;

  constructor(private newsService: NewsService, //private basicAuthService: BasicAuthService
  ) { }

  public createNews(e: Event): void {
    e.preventDefault();
    this.errorMessage = null;

    // SecurityUtils.getSubject().checkRole("admin");//damit user abfragen?
    //if(this.currentUser){  //this.currentUser = dem aktuellen user irgendwie

        if (this.headline.trim() != null && this.content.trim() != null) {
          this.newsService.create(this.headline, this.content).subscribe(
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
