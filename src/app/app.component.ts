import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { SecurityComponent } from './security/security.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ToastrService} from 'ngx-toastr';

import { alertServies } from './services/alertService';
import * as airportdata from './data_file.json';
import { AirportListService } from './services/airportListServices';
import { SearchComponent } from './search/search.component';
import { LoadComponentService } from './services/loadComponentService';
import { JwtClientService } from './services/jwt-client.service';
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
  @ViewChild(SearchComponent) child: SearchComponent;



  constructor(
    private httpCli: HttpClient,
    private router: Router,
    private securityComponent: SecurityComponent,private _snackBar: MatSnackBar,private toastrService:ToastrService,
    private alertt:alertServies,
    private airportListService:AirportListService,private loadCompo:LoadComponentService,
    private jwtClient:JwtClientService

  ) {
    debugger

    if(localStorage.getItem('token')){

      let token=localStorage.getItem('token');
      token=token.substring(1,token.length-1);
      this.jwtClient.welcome(token).subscribe(
        (data) => {
          debugger
          console.log(data);
        },
        (error) => {
          debugger;
          console.log('accessWithToken error found' ,error);
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          localStorage.removeItem('role');
          this.loggedIn=false;

        }
      );
    }
this.airportListService.setAirportList(airportdata);


    debugger;
    console.log('this', window.location.pathname);

    this.loadComponent = this.loadCompo.getLoadComponent();
    if (window.location.pathname == '/') {

      this.loadCompo.setLoadComponent('home');

    } else if (window.location.pathname == '/aircraft-component') {

      this.loadCompo.setLoadComponent('aircraft');


    } else if (window.location.pathname == '/profile-component') {

      this.loadCompo.setLoadComponent('profile');

    }
    else if (window.location.pathname == '/ticket-component') {
      this.loadCompo.setLoadComponent('ticket');

    }

else if (window.location.pathname == '/book-ticket') {

  this.loadCompo.setLoadComponent('book-ticket')

    }
    else if (window.location.pathname == '/home') {
      this.loadCompo.setLoadComponent('home')

    }
    this.loadComponent = this.loadCompo.getLoadComponent()
    if (localStorage.getItem('token')) {
      let tokenChekc = localStorage.getItem('"token"');
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
  ngOnInit() {
    debugger;

    //to load seach component data by default
    this.child.SearchFlights2();
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
debugger
    console.log('login form data submitted');
    // this.keywordsInput.nativeElement.click();

    console.log('loginn');
    console.log(formdata.username + '     ' + formdata.pass);



    let check=this.securityComponent.fromLogin(formdata.username, formdata.pass);
    debugger;
    if(check==true){

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
  else{
this.alertt.simpleAlert(' login ')

  }

  }
  signup(data) {
    debugger
    console.log('signup');
    if(data.password!=data.reenterpass){
      this.alertt.errorAlert("Password mistmatch");
    }
    else{

      this.securityComponent.signup(data.email,data.username.toLowerCase(),data.password)
      this.openSnackBar("Signup Successfull");
    //  window.location.reload();
  }

    //this.router.navigate(['/second-component'],

    //{queryParams: {}});
    // $('#loginForm').hide();
  }
  profile() {
    this.router.navigate(['/profile-component']);
    this.loadCompo.setLoadComponent('profile');
    this.loadComponent = 'profile';
  }

  aircraft() {
    this.router.navigate(['/aircraft-component']);
    this.loadCompo.setLoadComponent('aircraft');
    this.loadComponent = 'aircraft';
  }

  loadHome() {
   // console.log('signup');
    this.router.navigate(
      ['/'],{state:{usertype:"User"}}

   //   { queryParams: { loadComponent: 'home' } }
    );

   // window.location.reload();
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
    this.router.navigate(['/ticket-component']);
    this.loadCompo.setLoadComponent('ticket')
    this.loadComponent = 'ticket';
  }



  redirectToBookingPage(data){
    this.loadCompo.setLoadComponent('book-ticket');
    this.loadComponent='book-ticket';
    this.router.navigate(['/book-ticket'],{state:{flight:data}})
  }

  redirectToBookingDetailsPage(data){
    this.loadCompo.setLoadComponent('ticket-details');
    this.loadComponent='ticket-details';
    this.router.navigate(['/ticket-details'],{state:{bookingid:data}})
  }






}

