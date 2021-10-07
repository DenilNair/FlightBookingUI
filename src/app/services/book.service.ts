import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient:HttpClient) { }

  public bookTicket(request,url ){
    console.log("generateToken  ");
    let token=localStorage.getItem('token');
    debugger
   token= "Bearer "+token.substring(1,token.length-1);
   let userid=localStorage.getItem('id');
   debugger
   userid= userid.substring(1,userid.length-1);
   const headers = {  'Content-Type': 'application/json' ,'Authorization':token};
    return this.httpClient.post(url,request,{headers});
  }



}
