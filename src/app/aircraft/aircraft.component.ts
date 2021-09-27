import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { aircraftDetailsServies } from '../services/aircraftDetailsServices';
import { AircraftService } from '../classes/AircraftDetails';
import { MatButtonModule } from '@angular/material/button' ;
@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css']
})
export class AircraftComponent implements OnInit {

  constructor( private formBuilder: FormBuilder,private httpCli:HttpClient,private aircraftService:aircraftDetailsServies) { }

  listAircraft:AircraftService[];
  noAirCraft=true;
  errBlock=false;
  errorMsg="no error";



  ngOnInit(): void {
  }

  SearchAircraft(formData){
    console.log("form data "+formData.source +" "+formData.destination+" "+formData.departure);
    ///flight/src/{source}/dest/{desti}
    let tempArray;
    let url='http://localhost:9097/aircraft/all/';//+formData.source+'/dest/'+formData.destination+'/date/'+formData.departure;
    console.log(url);
    //let obs= this.httpCli.get(url,{responseType: 'text'});
     // obs.subscribe((response)=>console.log(response));
    this.aircraftService.getAircraft(url).subscribe(
      data=>{
    this.listAircraft=data;
    if(this.listAircraft.length==0){
      this.noAirCraft=true;
    }
    else{
      this.noAirCraft=false;
    }
      }, error=>{
        this.errBlock=true;
        console.log(error);
        this.errorMsg=error.message;
        console.log("accessWithToken error found"+this.errorMsg);
}
    );

}

}
