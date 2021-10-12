import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoadComponentService {

  constructor() { }
loadComponent:"home";
getLoadComponent(){
  return this.loadComponent
}
setLoadComponent(data){
  this.loadComponent=data;
}
}
