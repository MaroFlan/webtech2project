import { Component, Input, Output, EventEmitter } from '@angular/core';
import { News } from '../../news';
//import { HttpClient } from '@angular/common/http';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';
import { BasicAuthService } from '../../auth/basic-auth.service';
import * as bcrypt from 'bcryptjs';



@Component({
  selector: 'wt2-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass'],
  providers: [NewsService]
})

export class NewsListComponent {
  msg:string;//
  private url = "http://localhost:4200/rest/news";

 constructor(private newsService: NewsService, private router: Router, private basicAuthService: BasicAuthService) { }


  @Output() public deleted = new EventEmitter();
  @Output() public updated = new EventEmitter();


  public headline: string = "";
  public content: string = "";

  public currentUsername: string;
  public messageUsername: string;
  public news1: any;

  public salt: string = bcrypt.genSaltSync(10);


  @Input()
  public news: News[] = [];

  get reversedNews(): News[] {
    return this.news.slice().reverse();
  }


  clickEvent(){
    this.msg='The Carrier of Hope stays trusting in the Gods of Hope';
    return this.msg;
  }

  clickEvent2(){
      this.msg='The Gods of Hope may help those faithful individuals who are in desperate need of it';
      return this.msg;
    }

 public showEdit(id:number){
    var editForm = document.getElementById('edit-form-' + id);
    var allEditForms = Array.from(document.querySelectorAll('.edit-form'));

    allEditForms.forEach (f=>f.classList.remove('active'));
    editForm.classList.toggle('active');

 }


  public deleteNews(e: Event, username: string): void {

      e.preventDefault();
      //this.errorMessage = null;
      //console.log(e);
      var db_id= e.target[0].value;



      //console.log(e.target[0].username);
     // console.log(this.content);
     // console.log(db_id);
     //console.log(e.target[1].value);
     //console.log(e.target[2].value);

     //get the username of message here

    //this.news1 = this.newsService.getCreator(db_id);
    this.messageUsername = username;

        const cookie = document.cookie.split(',');
            this.currentUsername = cookie[0];
            const hash = cookie[1];

            if(bcrypt.compareSync(this.messageUsername, hash ) || bcrypt.compareSync("AdminOfAdmins", hash)){
            console.log("Identity check successful");
                            this.newsService.delete(db_id).subscribe(
                              () => {
                                this.deleted.emit();
                                console.log("Message deleted");
                              },
                              () => console.log("Error while deleting")
                            );
                      }
                      else{
                          console.log("This is not your message. You are not allowed to edit it");
                      }
                  }





    public updateNews(e: Event, username: string): void {

      e.preventDefault();

      //this.basicAuthService.findCurrentUserAndGet().subscribe({ next: (activeUser) => this.currentUsername = activeUser }); //aufruf returned aktuell noch ein Unauthorized

         // this.currentUsername = 'User1';



      var db_id= e.target[0].value; //
     // console.log(this.headline);
     // console.log(this.content);
     // console.log(db_id);
     console.log("headline update: " + e.target[1].value);
     console.log("content update: " + e.target[2].value);

     //get the username of message here
    this.messageUsername = username;
    //this.messageUsername = this.newsService.getCreator(db_id).toString();



    this.currentUsername = document.cookie;
    const cookie = document.cookie.split(',');
        this.currentUsername = cookie[0];
        const hash = cookie[1];

        if(bcrypt.compareSync(this.messageUsername, hash ) || bcrypt.compareSync("AdminOfAdmins", hash)){
        console.log("Identity check successful");
                      this.newsService.update(this.headline, this.content, db_id).subscribe(
                        () => {
                          this.updated.emit();
                          this.headline = "";
                          this.content = "";



                              console.log("Message updated");
                        },
                        () => console.log("Error while updating")
                      );
                  }

                  else{
                      console.log("This is not your message. You are not allowed to edit it");
                  }
            }
        //console.log(hash);
        //console.log(bcrypt.hashSync(this.messageUsername, this.salt));




    getCharsLeft(): number {
        return 255 - this.content.length; //anpassbar, sodass auch headline länge überprüft wird
      }
}
