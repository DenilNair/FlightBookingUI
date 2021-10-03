import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private httpClient:HttpClient) { }

  public generateToken(request ){
    console.log("generateToken  ");
    return this.httpClient.post("http://localhost:9192/authenticate",request,{responseType:'text' as 'json'});
  }


  public welcome(token){
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.httpClient.get("http://localhost:9192/",{headers,responseType:'text' as 'json'}).pipe(catchError(this.handleErrorrror));
  }
  /**
   * getFlights(path):Observable<any>{
    return this.httpClient.get(path);
  }
   */

  handleErrorrror(err){
return throwError(err);
  }
}
