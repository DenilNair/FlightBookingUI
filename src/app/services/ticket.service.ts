import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient:HttpClient) {

  }

   getTicketDetails():Observable<any>{
     let token=localStorage.getItem('token');
     debugger
    token= "Bearer "+token.substring(1,token.length-1);
    let userid=localStorage.getItem('id');
    debugger
    userid= userid.substring(1,userid.length-1);
    const headers = {  'Content-Type': 'application/json' ,'Authorization':token};
   return  this.httpClient.get('http://localhost:9097/customer/viewTicket/id/'+userid,{headers});
  }
}
