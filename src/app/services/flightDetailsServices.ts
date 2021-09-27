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

  handleErrorrror(err){
    return throwError(err);
  }
}
