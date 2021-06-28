import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
//import { User } from


@Component({
  selector: 'wt2-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass'],
  providers: [NewsService]
})
export class AccountComponent implements OnInit {


  //public username: string = "Hoffnungstraeger";
  //public currentUser: User;
  //public isUser: boolean;


  constructor(private newsService: NewsService) { }

  ngOnInit() { }

/*
  getProfile(){
    this.newsService.getUser(this.username).subscribe(

    console.log('what');
    )
  }

this.newsService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        this.isUser = (this.currentUser.username === this.profile.username);
      }
    );
  }
*/
}


