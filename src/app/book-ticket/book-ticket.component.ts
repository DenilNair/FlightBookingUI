import { Component, OnInit,ViewChild ,ElementRef} from '@angular/core';
import { alertServies } from '../services/alertService';
import { Router } from '@angular/router';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})

export class BookTicketComponent implements OnInit {

  @ViewChild('myDiv') myDiv: ElementRef;

  flightdetails:any;
  display='none';
  constructor(private router:Router,private alert:alertServies) {
    this.flightdetails=this.router.getCurrentNavigation().extras.state.flight;
    console.log(this.flightdetails.scheduledStartTime);
     console.log(typeof this.flightdetails.scheduledEndTime);
     this.flightdetails.scheduledStartTime=this.flightdetails.scheduledStartTime.substring(12,17);
     this.flightdetails.scheduledEndTime=this.flightdetails.scheduledEndTime.substring(12,17);
     console.log(this.flightdetails.scheduledStartTime);
   }

  ngOnInit(): void {
  }
  tiles: Tile[] = [

    {text: 'Two', cols: 1, rows: 6, color: '#bababa'},

  ];
totalFare=0;
totalPassanger=0;
TicketPrice=1000;

  addPass(){
    this.tiles.push( {text: 'Two', cols: 3, rows: 1, color: 'lightblue'},);

    if(this.totalPassanger==6){
this.alert.successAlertNotification("Maximum 6 passanger can be added at a time");

    }else{
      this.totalPassanger=this.totalPassanger+1;
      this.totalFare=this.totalPassanger*this.TicketPrice;}
  }

  myFunction(){

    console.log("denil nair");
   if(this.myDiv.nativeElement.checked){
     this.display='block';
   }
   else{
    this.display='none';
   }

  }
}
