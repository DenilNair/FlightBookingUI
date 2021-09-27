import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable()
export class aircraftDetailsServies{

  constructor(private httpClient:HttpClient){}

  getAircraft(path):Observable<any>{
    return this.httpClient.get(path).pipe(catchError(this.handleErrorrror));
  }

  handleErrorrror(err){

return throwError(err);
  }
}
