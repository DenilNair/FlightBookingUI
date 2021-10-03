import {Injectable} from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Injectable()
export class flightDetailsServies{

  constructor(private httpClient:HttpClient){}

  getFlights(path):Observable<any>{
    return this.httpClient.get(path).pipe(catchError(this.handleErrorrror));;;
  }


  public postFlights(request):Observable<any>{
console.log("from flight insert");

const headers = { 'userrole': 'ADMIN', 'Content-Type': 'application/json' };

  return  this.httpClient.post("http://localhost:9097/flightservice/flight/add",request,{headers});
  }
  handleErrorrror(err){
    return throwError(err);
  }
}
