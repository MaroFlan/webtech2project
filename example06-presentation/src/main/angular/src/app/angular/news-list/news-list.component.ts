import { Component, Input } from '@angular/core';
import { News } from '../../news';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'wt2-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass']
})
export class NewsListComponent {
  msg:string;//
  private url = "http://localhost:4200/rest/news";

  constructor (private httpClient: HttpClient){

  }

  @Input()
  public news: News[] = [];

  get reversedNews(): News[] {
    return this.news.slice().reverse();
  }


  //0 ist neueste news, n ist älteste
  clickEvent(){//
    this.httpClient.get(this.url + "/newest")
                    .subscribe(response => {
                          console.log(response); //gibt alle msgs zurück
                    });
    this.msg='Die Ehre gebührt Chris';
    return this.msg;
  }

  deleteEvent(id){
  //console.log(this.httpClient);
    return this.httpClient.delete(this.url + "/" + id)
                       .subscribe(response => {
                            console.log(response);
                        });
  }
}
