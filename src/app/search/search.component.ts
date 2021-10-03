import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { flightDetailsServies } from '../services/flightDetailsServices';
import { FlightService } from '../classes/flightDetails';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})


export class SearchComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private httpCli: HttpClient,
    private flightDetails: flightDetailsServies,
    private datepipe: DatePipe,
    private router:Router
  ) {}




  listFlight: FlightService[];
  noFlight = false;

  errBlock = false;
  errorMsg = '';
  //to not to show login form
  showLogin=false;
  display='none';
  displaySignup='none';




  SearchFlights(formData) {

    if (formData.departure.length == 16)
      formData.departure = this.stringToDate(formData.departure);
    debugger;
    console.log(
      'form data ' +
        formData.source +
        ' ' +
        formData.destination +
        ' ' +
        formData.departure
    );
    ///flight/src/{source}/dest/{desti}
    let tempArray;
    if (
      formData.source.length == 0 &&
      formData.destination.length == 0 &&
      formData.departure.length == 0
    ) {
      let url = 'http://localhost:9097/flightservice/flight/all';
      console.log(url);
      ////  let obs= this.httpCli.get(url,{responseType: 'text'});
      //obs.subscribe((response)=>console.log(response));

      this.flightDetails.getFlights(url).subscribe((data) => {
        this.listFlight = data;
        if (this.listFlight.length == 0) {
          this.noFlight = true;
        } else {
          this.noFlight = false;
        }
      });
      let url1 = 'http://localhost:9097/flightservice/flight/all';
      console.log(url);
      let obs1 = this.httpCli.get(url, { responseType: 'text' });
      obs1.subscribe((response) => console.log(response));
      this.flightDetails.getFlights(url1).subscribe(
        (data) => {
          this.listFlight = data;
        },
        (error) => {
          this.errBlock = true;
          this.errorMsg = error.message;
          console.log('accessWithToken error found' + this.errorMsg);
        }
      );
    } else if (
      !(
        formData.source.length == 0 ||
        formData.destination.length == 0 ||
        formData.departure.length == 0
      )
    ) {
      let url =
        'http://localhost:9097/flightservice/flight/src/' +
        formData.source +
        '/dest/' +
        formData.destination +
        '/date/' +
        formData.departure;
      console.log(url);
      let obs = this.httpCli.get(url, { responseType: 'text' });
      obs.subscribe((response) => console.log(response));
      this.flightDetails.getFlights(url).subscribe(
        (data) => {
          this.listFlight = data;
          if (this.listFlight.length == 0) {
            this.noFlight = true;
          } else {
            this.noFlight = false;
          }
        },

        (error) => {
          this.errBlock = true;
          this.errorMsg = error.message;
          console.log('accessWithToken error found' + this.errorMsg);
        }
      );
    } else if (
      formData.source.length == 0 &&
      formData.destination.length != 0 &&
      formData.departure.length != 0
    ) {
      let url =
        'http://localhost:9097/flightservice/flight/' +
        '/dest/' +
        formData.destination +
        '/date/' +
        formData.departure;
      console.log(url);
      let obs = this.httpCli.get(url, { responseType: 'text' });
      obs.subscribe((response) => console.log(response));
      this.flightDetails.getFlights(url).subscribe(
        (data) => {
          this.listFlight = data;
          if (this.listFlight.length == 0) {
            this.noFlight = true;
          } else {
            this.noFlight = false;
          }
        },

        (error) => {
          this.errBlock = true;
          this.errorMsg = error.message;
          console.log('accessWithToken error found' + this.errorMsg);
        }
      );
    }
    else if(formData.source.length != 0 &&
      formData.destination.length == 0 &&
      formData.departure.length != 0){
        let url =
        'http://localhost:9097/flightservice/flight/' +
        '/src/' +
        formData.source +
        '/date/' +
        formData.departure;
      console.log(url);
      let obs = this.httpCli.get(url, { responseType: 'text' });
      obs.subscribe((response) => console.log(response));
      this.flightDetails.getFlights(url).subscribe(
        (data) => {
          this.listFlight = data;
          if (this.listFlight.length == 0) {
            this.noFlight = true;
          } else {
            this.noFlight = false;
          }
        },

        (error) => {
          this.errBlock = true;
          this.errorMsg = error.message;
          console.log('accessWithToken error found' + this.errorMsg);
        }
      );
      }
  }
  ngOnInit() {

  }

  public stringToDate(dateval) {
    let date = new Date(dateval);
    let latest_date = this.datepipe.transform(date, 'dd-MMM-yyyy HH:mm:ss');
    // console.log("date = ",latest_date);
    //console.log("date in string format ",latest_date.toString())
    return latest_date.toString();
  }

  bookticket(data){
    console.log("bookticket bookticket bookticket",data.flightNo);
    debugger
    if(!localStorage.getItem('token')){
      this.display='block';
console.log("login check ",this.showLogin);

  }else{
    this.router.navigate(['/book-ticket'])

  }
  }
  onCloseHandled(){
    this.display='none';
    this.displaySignup='none';
 }

 openSignup(){
   console.log("open sign up");
   this.display='none';
   this.displaySignup='block';
 }
}
