import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketDetails } from '../classes/TicketDetails';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

bookingid:any
ticketList:TicketDetails[];
source:String;
destination:String;
startDate:String;
flightNo:String;
pnr:String;
  constructor(private router:Router,private ticket:TicketService) {

    debugger;
    this.bookingid = this.router.getCurrentNavigation().extras.state.bookingid;
    this.ticket.getTicketDetailsByBookingId(this.bookingid).subscribe((data) => {
      debugger;
      this.ticketList = data;
this.startDate=this.ticketList[0].scheduledStartTime;
this.source=this.ticketList[0].source;
this.destination=this.ticketList[0].destination;
this.flightNo=this.ticketList[0].flightNo;
this.startDate=this.ticketList[0].scheduledStartTime;
this.pnr=this.ticketList[0].pnr;
    },

    (error) => {
debugger;
      console.log('accessWithToken error found' + error.error.text);
    })
   }

  ngOnInit(): void {
    console.log('booking id', this.bookingid);
  }

  printpage(){
    window.print();
  }

}
