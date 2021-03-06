import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Injectable()
export class alertServies{

  constructor(private httpClient:HttpClient){}
  simpleAlert(data){
    Swal.fire('Backend '+data+ ' is down. Please Contact Administrator');
  }

  successAlertNotification(data){
    Swal.fire(data)
  }
  successAlertTicketBooked(){

    Swal.fire("Ticket Booked", "Congratulations. Have a Save and Happy Journey", "success");
  }
  successAlertAdmin(data){

    Swal.fire(data, "", "success");
  }
  errorAlert(data){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data,
     //footer: '<a href="">Why do I have this issue?</a>'
    })
  }

  alertConfirmation(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your Action cannot be rollback.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think again'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Done!',
          'Action performed successfully.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Performed action record present in cloud and databstore.)',
          'error'
        )
      }
    })
  }
}
