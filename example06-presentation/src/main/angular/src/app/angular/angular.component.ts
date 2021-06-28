import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from './news.service';
import { News } from '../news';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'wt2-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.sass'],
  providers: [NewsService]
})
export class AngularComponent implements OnInit {

  authService: AuthService;

  public latest: News;
  public news: News[] = [];

  constructor(protected newsService: NewsService) {
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.newsService.getNewest().subscribe(
      news => this.latest = news,
      console.error
    );
    this.newsService.getAll().subscribe(
      news => this.news = news,
      console.error
    );
  }



}
