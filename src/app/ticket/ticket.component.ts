import { Component, OnInit } from '@angular/core';
import { BookingDetails } from '../classes/BookingDetails';
import { TicketService } from '../services/ticket.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  listTicket:BookingDetails[];
  upcomingListTicket:BookingDetails[]=[];
  pastListTicket:BookingDetails[]=[];
  cancelledListTicket:BookingDetails[]=[];
  totalUpcoming=0;
  totalPast=0;
  totalCancelled=0;
noTicket=true;
  constructor(private bookDetails:BookingDetails,private ticketService:TicketService,private appCom:AppComponent) {
this.loadTicket();
   }

  ngOnInit(): void {
  }


  loadTicket(){
    debugger;
let response=this.ticketService.getTicketDetails();
response.subscribe(
  (data) => {
    //first time token added to local storage
    debugger
    console.log('token value --- ' + data);
this.listTicket=data;

if(this.listTicket.length==0){
  this.noTicket=true;
}else{

  for(let i=0;i<this.listTicket.length;i++){
    let dateStr=this.listTicket[i].boardingDate.toString();
    let newDate = new Date(dateStr);
    if(newDate>=new Date()){

     // this.upcomingListTicket.push(this.listTicket[i]);
     this.upcomingListTicket.push(this.listTicket[i]);
     this.totalUpcoming++;
    }
    else{
      //this.pastListTicket[this.totalPast]=this.listTicket[i];
      this.totalPast++;
    //  this.pastListTicket.push(this.listTicket[i]);

    }

  }
this.noTicket=false;}
  },
  (error) => {
    ////this.errBlock = true;
    //this.errorMsg = error.message;
    debugger
    console.log('Eception caugth can\'t schedule a  flight ' + error);
    ;
  }
);
  }


  OpenTicketDetails(data){
    console.log(data);
  }

  openTic(data){
    this.appCom.redirectToBookingDetailsPage(data.bookingId)
    console.log(data);
  }
}
