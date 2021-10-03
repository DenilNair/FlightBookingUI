import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { SecurityComponent } from './security/security.component';
import { ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FlightBooking';
  token_temp="";
  user_temp="";
  //snack bar duration
  durationInSeconds = 5;
  //to close login model form
  //


  //@ViewChild('keywordsInput') keywordsInput: ElementRef;

  constructor(
    private httpCli: HttpClient,
    private router: Router,
    private securityComponent: SecurityComponent,private _snackBar: MatSnackBar,private toastrService:ToastrService
  ) {


    //to initialize first time

    debugger;
    console.log('this', window.location.pathname);

    this.loadComponent = 'home';
    if (window.location.pathname == '/') {
      this.loadComponent = 'home';
    } else if (window.location.pathname == '/aircraft-component') {
      this.loadComponent = 'aircraft';
    } else if (window.location.pathname == '/profile-component') {
      this.loadComponent = 'profile';
    }
    else if (window.location.pathname == '/ticket-component') {
      this.loadComponent = 'ticket';
    }

else if (window.location.pathname == '/book-ticket') {
      this.loadComponent = 'book-ticket';
    }

    if (localStorage.getItem('token')) {
      let tokenChekc = localStorage.getItem('token');
      this.securityComponent.accessWithToken(tokenChekc);
      this.loggedIn = true;
  this.token_temp=localStorage.getItem("role");
      this.token_temp=this.token_temp.substring(1,this.token_temp.length-1);
      if(this.token_temp=="ADMIN"){
        this.userRole="ADMIN";
      }
      else if(this.token_temp=="USER"){
        this.userRole="USER";
      }
      else{
        this.userRole="GUEST";
      }

      console.log( localStorage.getItem('token'));

      console.log( localStorage.getItem('role'));

      console.log( "USER");
    }
  }
  ngOnInit() {
    debugger;
    let obs = this.httpCli.get('http://localhost:9097/flightservice/all', {
      responseType: 'text',
    });
    obs.subscribe((response) =>
      console.log('denil    ' + JSON.stringify(response))
    );
    console.log("by default value")
    if (localStorage.getItem('token')) {
      let tokenChekc = localStorage.getItem('token');
      this.securityComponent.accessWithToken(tokenChekc);
      this.loggedIn = true;
      this.token_temp=localStorage.getItem("role");
      this.token_temp=this.token_temp.substring(1,this.token_temp.length-1);
      if(this.token_temp=="ADMIN"){
        this.userRole="ADMIN";
      }
      else if(this.token_temp=="USER"){
        this.userRole="USER";
      }
      else{
        this.userRole="GUEST";
      }

    }
  }
  loggedIn = false;
  loadComponent = 'home';
userRole="GUEST";





  //for login
  login(formdata) {

    console.log('login form data submitted');
    // this.keywordsInput.nativeElement.click();

    console.log('loginn');
    console.log(formdata.username + '     ' + formdata.pass);



    this.securityComponent.fromLogin(formdata.username, formdata.pass);

    if(!localStorage.getItem("role")){
      this.openSnackBar("Invalid user id/password");
    }
    else{

    this.openSnackBar("Loggin Successfull");
    }

    window.location.reload();
    // $('#loginForm').hide();
    this.loggedIn = true;
    console.log("from login page loggedin ",localStorage.getItem("role"));
    this.token_temp=localStorage.getItem("role");
    this.token_temp=this.token_temp.substring(1,this.token_temp.length-1);
    if(this.token_temp=="ADMIN"){
      this.userRole="ADMIN";
    }
    else if(this.token_temp=="USER"){
      this.userRole="USER";
    }
    else{
      this.userRole="GUEST";
    }
  }
  signup() {
    console.log('signup');
    this.openSnackBar("Signup Successfull");
    //this.router.navigate(['/second-component'],

    //{queryParams: {}});
    // $('#loginForm').hide();
  }
  profile() {
    this.router.navigate(['/profile-component']);
    this.loadComponent = 'profile';
  }

  aircraft() {
    this.router.navigate(['/aircraft-component']);
    this.loadComponent = 'aircraft';
  }

  loadHome() {
   // console.log('signup');
    this.router.navigate(
      ['/'],{state:{usertype:"User"}}

   //   { queryParams: { loadComponent: 'home' } }
    );
    // $('#loginForm').hide();
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
   // window.location.reload();

   this.router.navigate(['/']);

   window.location.reload();
  }


  //logi message
  openSnackBar(message) {

    this._snackBar.open('Message archived', 'Undo', {
      duration: 3
    });
   this._snackBar.dismiss();
  }

  showBooking(){
    this.router.navigate(['/ticket-component'])
    this.loadComponent = 'ticket';
  }
}
