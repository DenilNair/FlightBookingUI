import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AirportListService {

  constructor(private httpClient:HttpClient) { }
 airportList:any;
  public setAirportList(request ){
    this.airportList=request;
  }

  public getAirportList(){
    return this.airportList;
  }
  postAircraft(request):Observable<any>{
    const headers = {  'Content-Type': 'application/json' };
    debugger
      return  this.httpClient.post("http://localhost:9097/airport/add",request,{headers});

  }


}
