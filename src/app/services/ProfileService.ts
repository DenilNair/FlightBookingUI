import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient:HttpClient) { }


  public setProfile(request,token ){
    console.log("generateToken  ");
    const headers=new HttpHeaders().set("Authorization",token);
    return this.httpClient.put("http://localhost:9097/customer/",{headers,request},{responseType:'text' as 'json'});
  }

  public getProfile(token){
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.httpClient.get("http://localhost:9097/customer/profile",{headers,responseType:'text' as 'json'}).pipe(catchError(this.handleErrorrror));
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
