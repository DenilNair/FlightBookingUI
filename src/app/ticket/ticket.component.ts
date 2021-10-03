import { Component, OnInit } from '@angular/core';
import { TicketDetails } from '../classes/TicketDetails';
import { TicketService } from '../services/ticket.service';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  listTicket:TicketDetails[];
noTicket=true;
  constructor(private ticketDetails:TicketDetails,private ticketService:TicketService) {
this.loadTicket();
   }

  ngOnInit(): void {
  }


  loadTicket(){
let response=this.ticketService.getTicketDetails();
response.subscribe(
  (data) => {
    //first time token added to local storage
    debugger
    console.log('token value --- ' + data);
this.listTicket=data;
if(this.listTicket.length==0){this.noTicket=true;}else{
this.noTicket=false;}
  },
  (error) => {
    ////this.errBlock = true;
    //this.errorMsg = error.message;
    console.log('Eception caugth can\'t schedule a  flight ' + error);
    ;
  }
);
  }
}
