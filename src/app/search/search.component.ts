import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { flightDetailsServies } from '../services/flightDetailsServices';
import { FlightService } from '../classes/flightDetails';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { alertServies } from '../services/alertService';
import { AirportListService } from '../services/airportListServices';
import { LoadComponentService } from '../services/loadComponentService';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent implements OnInit {
  ///////////////////////

  //keyword = 'name';
  keyword = 'name';
  public airport:any;

  //
  ////////////////////////
  constructor(
    private formBuilder: FormBuilder,
    private httpCli: HttpClient,
    private flightDetails: flightDetailsServies,
    private datepipe: DatePipe,
    private router: Router,

    private alert: alertServies,
    private airports: AirportListService,
    private loadCompo:LoadComponentService,private appCompo:AppComponent
  ) {

  }



  listFlight: FlightService[];
  noFlight = false;

  errBlock = false;
  errorMsg = '';
  //to not to show login form
  showLogin = false;
  display = 'none';
  displaySignup = 'none';

  SearchFlights(formData) {
    debugger;

    if (formData != null) {
      if (formData.departure.length == 16)
        formData.departure = this.stringToDate(formData.departure);
      debugger;


      if(formData.source.name!=undefined){
        if(formData.source.name.length>=3){
          formData.source=formData.source.name.split(" ")[0];
        }
      }
      if(formData.destination.name!=undefined){
        if(formData.destination.name.length>=3){
          formData.destination=formData.destination.name.split(" ")[0];
        }
      }

      ///flight/src/{source}/dest/{desti}
      let tempArray;
      if (
        (formData.source.length == 0 &&
          formData.destination.length == 0 &&
          formData.departure.length == 0) ||
        formData == null
      ) {
        let url = 'http://localhost:9097/flightservice/flight/all';
        console.log(url);
        ////  let obs= this.httpCli.get(url,{responseType: 'text'});
        //obs.subscribe((response)=>console.log(response));

        let url1 = 'http://localhost:9097/flightservice/flight/all';
        console.log(url);
        let obs1 = this.httpCli.get(url, { responseType: 'text' });
        obs1.subscribe((response) => console.log(response));
        this.flightDetails.getFlights(url1).subscribe(
          (data) => {
            this.listFlight = data;
            this.noFlight = false;
          },
          (error) => {
            this.noFlight = true;
            this.errBlock = true;
            this.errorMsg = error.message;
            this.alert.simpleAlert('Flight Service');
            console.log('accessWithToken error found' + this.errorMsg);
          }
        );
      } else if (
        (
          formData.source.length != 0 &&
          formData.destination.length != 0 &&
          formData.departure.length != 0
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
      } else if (
        formData.source.length != 0 &&
        formData.destination.length == 0 &&
        formData.departure.length != 0
      ) {
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
      } else if (
        formData.source.length != 0 &&
        formData.destination.length == 0 &&
        formData.departure.length == 0
      ) {
        let url =
          'http://localhost:9097/flightservice/flight/' +
          '/src/' +
          formData.source;
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
        formData.departure.length == 0
      ) {
        let url =
          'http://localhost:9097/flightservice/flight/' +
          '/dest/' +
          formData.destination;
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
    } else {
      let url = 'http://localhost:9097/flightservice/flight/upcoming';

      let obs1 = this.httpCli.get(url, { responseType: 'text' });
      obs1.subscribe((response) => console.log(response));
      this.flightDetails.getFlights(url).subscribe(
        (data) => {
          this.listFlight = data;
          this.noFlight = false;
        },
        (error) => {
          this.noFlight = true;
          this.errBlock = true;
          this.errorMsg = error.message;
          this.alert.simpleAlert('Flight Service');
          console.log('accessWithToken error found' + this.errorMsg);
        }
      );
    }
  }

  SearchFlights2() {
    debugger;
    console.log('SearchFlights');
  }
  ngOnInit() {
    debugger
     this.airport = this.airports.getAirportList().default;
    console.log(this.airport);
    this.SearchFlights(null);
    console.log('countries');
  }

  public stringToDate(dateval) {
    let date = new Date(dateval);
    let latest_date = this.datepipe.transform(date, 'dd-MMM-yyyy HH:mm:ss');
    // console.log("date = ",latest_date);
    //console.log("date in string format ",latest_date.toString())
    return latest_date.toString();
  }

  bookticket(data) {
    console.log('bookticket bookticket bookticket', data.flightNo);
    debugger;
    if (!localStorage.getItem('token')) {
      this.alert.successAlertNotification('Login as User to Book Ticket .');

      console.log('login check ', this.showLogin);
    } else {
      if (localStorage.getItem('role') == '"ADMIN"') {
        this.alert.successAlertNotification(
          'Login as User to Book Ticket . Admin is not allowed to book'
        );
      } else {
        this.loadCompo.setLoadComponent('book-ticket');
        this.appCompo.redirectToBookingPage(data)
      //  this.router.navigate(['/book-ticket'], { state: { flight: data } });
      //  this..redirectToBookingPage(data);
      }

      // this.router.navigate(['/book-ticket'])
    }
  }
  onCloseHandled() {
    this.display = 'none';
    this.displaySignup = 'none';
  }

  //////////////////////////////
  ///////////////////////////

  selectEvent(item) {
    // do something with selected item
    console.log('selectEvent');
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log('onChangeSearch');
  }

  onFocused(e) {
    // do something
    console.log('onFocused');
  }

  toLoadEverything() {
    console.log('loading');
  }
}
