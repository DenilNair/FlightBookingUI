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
  postAircraft(request):Observable<any>{
    console.log("from flight insert");

    const headers = {  'Content-Type': 'application/json' };
    debugger
      return  this.httpClient.post("http://localhost:9097/aircraft/add",request,{headers});

  }
  handleErrorrror(err){

return throwError(err);
  }
}
