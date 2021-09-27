import { Component, OnInit } from '@angular/core';
import { JwtClientService } from '../services/jwt-client.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  authRequest:any={
    "userName":"javatechie",
    "password":"password"
}

response:any;
tokengot=false;
errBlock=false;
errorMsg="";
  constructor(private service:JwtClientService) { }

  ngOnInit(): void {
  }

  public getAccessToken(){

    console.log("from getAccessToken");
    console.log("from login method"+this.authRequest.userName+"  "+this.authRequest.password);
    let resp=this.service.generateToken(this.authRequest);
    /* */
    resp.subscribe(data=>{
      //first time token added to local storage
      localStorage.setItem('token',JSON.stringify(data));
      this.accessWithToken(data)}
      ,error=>{
        this.errBlock=true;
        this.errorMsg=error.message;
        console.log("getAccessToken error found"+this.errorMsg);

});
  }

  public accessWithToken(token){
    console.log(token);

    console.log("before token check");
let resp=this.service.welcome(token);

resp.subscribe(data=>
  this.setToken(data)
  ,error=>{
          this.errBlock=true;
          this.errorMsg=error.message;
          console.log("accessWithToken error found"+this.errorMsg);
  }
  )
  }


  public setToken(data){
    this.response=data;
    console.log("token setted reponse "+this.response)
  }


  public fromLogin(username,pass){
    console.log("from login method"+username+"  "+pass);
this.authRequest.userName=username;
this.authRequest.password=pass;
this.getAccessToken();
  }

}
