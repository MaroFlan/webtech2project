import { Component, Input, Output, EventEmitter } from '@angular/core';
import { News } from '../../news';
//import { HttpClient } from '@angular/common/http';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';


@Component({
  selector: 'wt2-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass'],
  providers: [NewsService]
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


  public deleteNews(e: Event): void {

      e.preventDefault();
      //this.errorMessage = null;
      //console.log(e);
      var db_id= e.target[0].value;

        this.newsService.delete(db_id).subscribe(
          () => {
            this.deleted.emit(); // wird in auth.component.html aufgefangen
            /*--------------------OUTDATED--------------------*/
            // let currentUrl = this.router.url;
            // console.log(currentUrl);
            // //window.location.reload(); //virgin page refresh
            // this.router.navigate(['/']).then(() => { this.router.navigate([currentUrl]); }) // chad fucking redirect (kill me now)
            /*--------------------OUTDATED--------------------*/
          },
          () => console.log("Error while deleting")
        );
      }




    public updateNews(e: Event): void {

      e.preventDefault();


      var db_id= e.target[0].value; //
     // console.log(this.headline);
     // console.log(this.content);
     // console.log(db_id);


      this.newsService.update(this.headline, this.content, db_id).subscribe(
        () => {
          this.updated.emit();  //y u no work? https://bit.ly/3xuptX6
          this.headline = "";
          this.content = "";
          /*--------------------OUTDATED--------------------*/
        //  let currentUrl = this.router.url;
        //   console.log(currentUrl);
        //       this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        //           this.router.navigate([currentUrl]);
        //       });
          //this.router.navigate(['/']).then(() => { this.router.navigate([currentUrl]); }) // rausfinden wo der redirect hin muss //currentUrl
        //  this.router.navigate([this.router.url])
          /*--------------------OUTDATED--------------------*/


        },
        () => console.log("Error while updating")
      );
    }

    getCharsLeft(): number {
        return 255 - this.content.length; //anpassbar, sodass auch headline länge überprüft wird
      }
}
