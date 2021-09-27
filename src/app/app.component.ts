import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityComponent } from './security/security.component';
import { ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'FlightBooking';
  //to close login model form

//@ViewChild('keywordsInput') keywordsInput: ElementRef;


  constructor(private httpCli:HttpClient,private router: Router,private securityComponent:SecurityComponent){
    console.log('this', window.location.pathname);
    this.loadComponent="home";
    if(window.location.pathname=="/"){
      this.loadComponent="home";
    }
    else if(window.location.pathname=="/aircraft-component"){
this.loadComponent="aircraft"
    }
    else if(window.location.pathname=="/profile-component"){
      this.loadComponent="profile"
          }
  }
  ngOnInit(){
   let obs= this.httpCli.get('http://localhost:9091/flightservice/all',{responseType: 'text'});
   obs.subscribe((response)=>console.log('denil    '+JSON.stringify(response)));
   if(  localStorage.getItem('token')){
                        let tokenChekc=localStorage.getItem('token');
                        this.securityComponent.accessWithToken(tokenChekc);
                        this.loggedIn=true;
                          }
  }
loggedIn=false;
loadComponent="home";


//for login
  login(formdata){
    console.log("login form data submitted");
   // this.keywordsInput.nativeElement.click();
    console.log("loginn");
    console.log(formdata.username+"     "+formdata.pass)
    this.securityComponent.fromLogin(formdata.username,formdata.pass);
    window.location.reload();
   // $('#loginForm').hide();
this.loggedIn=true;

  }
  signup(){
    console.log("signup");
    //this.router.navigate(['/second-component'],

    //{queryParams: {}});
   // $('#loginForm').hide();

  }
  profile(){
    this.router.navigate(['/profile-component']);
    this.loadComponent="profile";
  }


  aircraft(){
    this.router.navigate(['/aircraft-component']);
    this.loadComponent="aircraft";
  }

  loadHome(){
    console.log("signup");
    this.router.navigate(['/'],

    {queryParams: {"loadComponent":"home"}});
   // $('#loginForm').hide();

  }

  logout(){
    this.loggedIn=false;
    localStorage.removeItem('token');
    window.location.reload();

  }
}
