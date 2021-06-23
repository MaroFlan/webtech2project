import { Component, Input, Output, EventEmitter } from '@angular/core';
import { News } from '../../news';
import { HttpClient } from '@angular/common/http';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wt2-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass']
})

export class NewsListComponent {
  msg:string;//
  private url = "http://localhost:4200/rest/news";

 constructor(private newsService: NewsService, private router: Router) { }

  @Output()
  public deleted = new EventEmitter();
  public updated = new EventEmitter();

  public headline: string = "";
  public content: string = "";


  @Input()
  public news: News[] = [];

  get reversedNews(): News[] {
    return this.news.slice().reverse();
  }


  clickEvent(){
    this.msg='Die Ehre gebührt Chris';
    return this.msg;
  }




  public deleteNews(e: Event): void {

      e.preventDefault();
      //this.errorMessage = null;
      //console.log(e);
      var db_id= e.target[0].value;

        this.newsService.delete(db_id).subscribe(
          () => {
            this.deleted.emit();
            //window.location.reload(); //virgin page refresh
            this.router.navigate(['/']).then(() => { this.router.navigate(['/angular' ]); }) // chad fucking redirect (kill me now)
          },
          () => console.log("Error while deleting")
        );
      }



    public updateNews(e: Event): void {

      e.preventDefault();
      //this.headline="yes";
      //this.content="no";


      var db_id= e.target[0].value; //
      console.log(this.headline);
      console.log(this.content);
      console.log(db_id);


              this.newsService.update(this.headline, this.content, db_id).subscribe(
                () => {
                  this.updated.emit();
                 // this.headline = "";
               //   this.content = "";
                  this.router.navigate(['/']).then(() => { this.router.navigate(['/angular' ]); }) // chad fucking redirect (kill me now)
                },
                () => console.log("Error while updating")
              );
    }

    getCharsLeft(): number {
        return 255 - this.content.length; //anpassbar, sodass auch headline länge überprüft wird
      }
}
