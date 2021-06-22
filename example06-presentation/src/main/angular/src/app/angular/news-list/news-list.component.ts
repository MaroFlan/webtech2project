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


  @Input()
  public news: News[] = [];

  get reversedNews(): News[] {
    return this.news.slice().reverse();
  }


  //0 ist neueste news, n ist älteste
  clickEvent(){//
   // this.httpClient.get(this.url + "/newest")
     //               .subscribe(response => {
       //                   console.log(response); //gibt alle msgs zurück
         //           });
    this.msg='Die Ehre gebührt Chris';
    return this.msg;
  }
  /*
  deleteEvent(id){ //button id ist von position der nachricht abhängig. aber wir brauchen id der nachricht damit keine fehler geschehen

  var db_id= this.news[id].id;
  //console.log(db_id);
    return this.httpClient.delete(this.url + "/" + db_id)
                       .subscribe(response => {
                            this.deleted.emit();
                            console.log(response);
                        });
  }*/



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

}
