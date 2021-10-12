import {Injectable} from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable()
export class flightDetailsServies{

  constructor(private httpClient:HttpClient){}

  getFlights(path):Observable<any>{
    return this.httpClient.get(path).pipe(catchError(this.handleErrorrror));;;
  }


  public postFlights(request):Observable<String>{


const headers = { 'userrole': 'ADMIN', 'Content-Type': 'application/json' ,responseType: 'text' as const};
debugger
  return  this.httpClient.post<String>("http://localhost:9097/flightservice/flight/add",request,{headers}). pipe(map(res => {
    return res;
}));
  }
  handleErrorrror(err){
    debugger
    return throwError(err);
  }



}
