import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { alertServies } from '../services/alertService';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { TicketDetails } from '../classes/TicketDetails';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css'],
})
export class BookTicketComponent implements OnInit {
  @ViewChild('myDiv') myDiv: ElementRef;

  flightdetails: any;
  display = 'none';

  tickets: TicketDetails[];
  currticket: TicketDetails;
   customer_id=localStorage.getItem('id');
  //form array
  form: FormGroup;
  start_time:any;
  end_time:any;

  creds: any;
timediff:any;
  constructor(
    private router: Router,
    private alert: alertServies,
    private bookService: BookService,
    private fb: FormBuilder,

  ) {
    this.flightdetails = this.router.getCurrentNavigation().extras.state.flight;
    this.start_time=this.flightdetails.scheduledStartTime;
    this.end_time=this.flightdetails.scheduledEndTime
this.timediff= ( new Date(this.flightdetails.scheduledEndTime).getTime()- new Date(this.flightdetails.scheduledStartTime).getTime())/1000;

this.timediff=Math.trunc(this.timediff/(60*60))+':'+Math.trunc((this.timediff%60)/60);
   this.flightdetails.scheduledStartTime =
      this.flightdetails.scheduledStartTime.substring(12, 17);
    this.flightdetails.scheduledEndTime =
      this.flightdetails.scheduledEndTime.substring(12, 17);

    this.form = this.fb.group({
      published: true,
      credentials: this.fb.array([]),
    });
  }
  orderForm!: FormGroup;
  items!: FormArray;
  ngOnInit(): void {
    this.orderForm = new FormGroup({
      items: new FormArray([]),
    });
  }
  tiles: Tile[] = [{ text: 'Two', cols: 1, rows: 6, color: '#bababa' }];
  totalFare = 0;
  totalPassanger = 0;
  TicketPrice = 1000;




  BookTicket() {
    console.log(this.tiles);
    if(this.items==undefined){
      this.alert.errorAlert('Please add atleast 1 passanger to book');
    }
     else {
      console.log(this.items.value);
      this.bookService.bookTicket(this.items.value,"http://localhost:9097/customer/bookticket/flightId/"+this.flightdetails.id).subscribe(
        data=>{
         console.log(data);
         this.alert.successAlertTicketBooked();
        },
        (error) => {
debugger
          console.log("Eception caugth can't add new  aircraft " , error);
          if(error.error.text=="Ticket booked"){
            this.alert.successAlertTicketBooked();
          }
        }
      )


    }
  }



  save() {
    console.log(this.creds);
  }

  createItem(): FormGroup {
    return this.fb.group({
      name: '',
      age: '',
      gender: '',
      meal: '',
      customerId:Number(this.customer_id),
      source:this.flightdetails.source,
      destination:this.flightdetails.destination,
      scheduledStartTime: this.start_time ,
      scheduledEndTime: this.end_time ,
      ticketFare:'',
      status:'BOOKED',
      flightNo:this.flightdetails.flightNo


    });
  }
  addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    if(this.items.length==6){
      this.alert.successAlertNotification(
        'Maximum 6 passanger can be added at a time'
      );
    }
    else{
      this.items = this.orderForm.get('items') as FormArray;
   // console.log('form array ');
   // console.log(this.items.value);
    let temp = this.createItem();
   // console.log('temp ',temp)
    this.items.push(temp);
    }

  }


  getControls() {
    return (this.orderForm.get('items') as FormArray).controls;
  }


}
