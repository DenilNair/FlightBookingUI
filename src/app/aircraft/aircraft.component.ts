import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { aircraftDetailsServies } from '../services/aircraftDetailsServices';
import { AircraftService } from '../classes/AircraftDetails';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../services/notification.service';

import { title } from 'process';
import { flightDetailsServies } from '../services/flightDetailsServices';

import { DatePipe } from '@angular/common';
import { alertServies } from '../services/alertService';
@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css'],
})
export class AircraftComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private httpCli: HttpClient,
    private aircraftService: aircraftDetailsServies,
    private _snackBar: MatSnackBar,
    private flightService: flightDetailsServies,
    private datePipe:DatePipe,
    private alert:alertServies
  ) {}

  listAircraft: AircraftService[];
  noAirCraft = true;
  errBlock = false;
  errorMsg = 'no error';

  ngOnInit(): void {}

  SearchAircraft(formData) {
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
    let url = 'http://localhost:9097/aircraft/all/'; //+formData.source+'/dest/'+formData.destination+'/date/'+formData.departure;
    console.log(url);
    //let obs= this.httpCli.get(url,{responseType: 'text'});
    // obs.subscribe((response)=>console.log(response));
    this.aircraftService.getAircraft(url).subscribe(
      (data) => {
        this.listAircraft = data;
        if (this.listAircraft.length == 0) {
          this.noAirCraft = true;
        } else {
          this.noAirCraft = false;
        }
        this.errBlock=false;
      },
      (error) => {
        this.errBlock = true;
        console.log(error);
        this.errorMsg = error.message;
        console.log('accessWithToken error found' + this.errorMsg);
      }
    );
  }

  openSnackBar(message) {
    // this._snackBar.open(message, "null",  {duration:0 });
    this._snackBar.open('message', 'action', {
      duration: 2,
    });
    this._snackBar.dismiss;
  }

  ScheduleFlight(temp) {
    //let letsContinue = false;
    console.log('toaster', temp);
temp.scheduledStartTime=this.changeDateFormat(temp.scheduledStartTime);
temp.scheduledEndTime=this.changeDateFormat(temp.scheduledEndTime);

debugger
    this.flightService.postFlights(temp).subscribe(
      (data) => {
        debugger
        //first time token added to local storage
        console.log('flight sceduled --- ' + data);
        this.alert.  successAlertTicketBooked();
       // letsContinue = true;
      },
      (error) => {
        this.errBlock = true;
        this.errorMsg = error.message;
       // letsContinue = true;
        console.log(
          "Exception caugth can't schedule a  flight " + this.errorMsg
        );
        //this.alert.  successAlertTicketBooked();
      }

    );

    //this.alert.  successAlertTicketBooked();
    //this.toaster.success("message", "title");
    //this.notificationService.showSuccess("flight scheduled ","successfull");
    //  this.openSnackBar("New Flight Scheduled");
  }
  AddAircraft(temp) {
    //this.openSnackBar("New Aircraft Added");
    console.log('toaster', temp);

    let response = this.aircraftService.postAircraft(temp);

    response.subscribe(
      (data) => {
        //first time token added to local storage
        console.log('aircraft added --- ' + data);
      },
      (error) => {
        this.errBlock = true;
        this.errorMsg = error.message;
        console.log("Eception caugth can't add new  aircraft " + this.errorMsg);
      }
    );
  }

  public changeDateFormat(dateval) {
    let date = new Date(dateval);
    let latest_date = this.datePipe.transform(date, 'dd-MMM-yyyy HH:mm:ss');
    // console.log("date = ",latest_date);
    //console.log("date in string format ",latest_date.toString())
    return latest_date.toString();
  }
}
