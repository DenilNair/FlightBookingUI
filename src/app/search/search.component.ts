import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { flightDetailsServies } from '../services/flightDetailsServices';
import { FlightService } from '../classes/flightDetails';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  constructor(  private formBuilder: FormBuilder,private httpCli:HttpClient, private flightDetails:flightDetailsServies) {

   }

listFlight:FlightService[];
noFlight=false;

errBlock=false;
errorMsg="";

   SearchFlights(formData){
              console.log("form data "+formData.source +" "+formData.destination+" "+formData.departure);
              ///flight/src/{source}/dest/{desti}
              let tempArray;
              if(formData.source.length==0 && formData.destination.length==0 && formData.departure.length==0){
                let url='http://localhost:9097/flightservice/flight/all';
              console.log(url);
            ////  let obs= this.httpCli.get(url,{responseType: 'text'});
                //obs.subscribe((response)=>console.log(response));


              this.flightDetails.getFlights(url).subscribe(
                data=>{
              this.listFlight=data;
                      if(this.listFlight.length==0){
                        this.noFlight=true;
                      }
                      else{
                        this.noFlight=false;
                      }
                }
              );
              let url1='http://localhost:9097/flightservice/flight/all';
              console.log(url);
              let obs1= this.httpCli.get(url,{responseType: 'text'});
                obs1.subscribe((response)=>console.log(response));
              this.flightDetails.getFlights(url1).subscribe(
                data=>{
                    this.listFlight=data;
                }, error=>{
                  this.errBlock=true;
                  this.errorMsg=error.message;
                  console.log("accessWithToken error found"+this.errorMsg);
          }
              );



              }else{
                let url='http://localhost:9097/flightservice/flight/src/'+formData.source+'/dest/'+formData.destination+'/date/'+formData.departure;
              console.log(url);
              let obs= this.httpCli.get(url,{responseType: 'text'});
                obs.subscribe((response)=>console.log(response));
              this.flightDetails.getFlights(url).subscribe(
                data=>{
              this.listFlight=data;
              if(this.listFlight.length==0){
                this.noFlight=true;
              }
              else{
                this.noFlight=false;
              }
                }


                , error=>{
                  this.errBlock=true;
                  this.errorMsg=error.message;
                  console.log("accessWithToken error found"+this.errorMsg);
          }
              );
              }


   }
  //on submit of form


  ngOnInit(): void {
  }

}
