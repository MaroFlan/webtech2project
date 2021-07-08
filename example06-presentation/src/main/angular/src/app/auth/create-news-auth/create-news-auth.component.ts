import { Component } from '@angular/core';
import { CreateNewsComponent } from '../../angular/create-news/create-news.component';
import { AuthNewsService } from '../auth-news.service';
import { AuthService } from '../../auth/auth.service';
import { BasicAuthService } from '../../auth/basic-auth.service'

@Component({
  selector: 'wt2-create-news-auth',
  templateUrl: '../../angular/create-news/create-news.component.html',
  styleUrls: ['../../angular/create-news/create-news.component.sass']
})
export class CreateNewsAuthComponent extends CreateNewsComponent {

  constructor(newsService: AuthNewsService, basicAuthService: BasicAuthService)//, authService: AuthService)
  {
    super(newsService, basicAuthService);//, authService);
  }

  //public what(): HttpHeaders{
  //return this.newsService.getAuthHeaders()
  //}
}
