import { Component, Input } from '@angular/core';
import { News } from '../../news';

@Component({
  selector: 'wt2-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass']
})
export class NewsListComponent {
  msg:string;//

  @Input()
  public news: News[] = [];

  get reversedNews(): News[] {
    return this.news.slice().reverse();
  }



  clickEvent(){//
    this.msg='Die Ehre gebührt Chris';
    return this.msg;
  }

  deleteEvent(id){

    this.msg = this.news[2].toString();
    //this.news.splice(0,3);
    //delete this.news[0];
    return this.msg;



  }

}