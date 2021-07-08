import { Component, EventEmitter, Output } from '@angular/core';
import { NewsService } from '../news.service';
import { BasicAuthService } from '../../auth/basic-auth.service';

@Component({
  selector: 'wt2-news-update',
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.sass'],
  providers: [NewsService]
})
export class UpdateNewsComponent {

  @Output()
  public created = new EventEmitter();

  public headline: string = "";
  public content: string = "";
  public errorMessage: string;

  public currentUsername: string;

  constructor(private newsService: NewsService, private basicAuthService: BasicAuthService) { }

  public createNews(e: Event): void {
    e.preventDefault();
    this.errorMessage = null;


    this.basicAuthService.findCurrentUserAndGet().subscribe({ next: (activeUser) => this.currentUsername = activeUser }); //aufruf returned aktuell noch ein Unauthorized
        //console.log(this.currentUsername);          //aufruf beim service evtl an dem auth-newsService orientieren
        //console.log('2');
        this.currentUsername = 'User1'; //solange der Unauthorized da ist, beispielUser für Testzwecke setzen
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
  }

  getCharsLeft(): number {
    return 255 - this.content.length;
  }
}
