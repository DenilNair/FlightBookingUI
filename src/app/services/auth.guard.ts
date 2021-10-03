import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtClientService } from './jwt-client.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: JwtClientService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
debugger
let current_component=route.routeConfig.path;
if(current_component=="aircraft-component"){//this.router.navigate(['/'])
  if (localStorage.getItem('token')) {
   let token_temp="";
    token_temp=localStorage.getItem("role");
    token_temp=token_temp.substring(1,token_temp.length-1);
    if(token_temp=="ADMIN"){return true;}
    else{return false;}

  }
  else{
    this.router.navigate(['/error'],{state:{usertype:"Admin"}});
    return false;
  }}
if(current_component=="profile-component"){
  //this.router.navigate(['/'])
  if (localStorage.getItem('token')) {
    let token_temp="";
     token_temp=localStorage.getItem("role");
     token_temp=token_temp.substring(1,token_temp.length-1);
     if(token_temp=="USER"){return true;}
     else{return false;}

   }
   else{
     this.router.navigate(['/error'],{state:{usertype:"User"}});
     return false;
   }
}
if(current_component=="ticket-component"){
  //this.router.navigate(['/'])
  if (localStorage.getItem('token')) {
    let token_temp="";
     token_temp=localStorage.getItem("role");
     token_temp=token_temp.substring(1,token_temp.length-1);
     if(token_temp=="USER"){return true;}
     else{return false;}

   }
   else{
     this.router.navigate(['/error'],{state:{usertype:"User"}});
     return false;
   }
}
if(current_component=="book-ticket"){
  //this.router.navigate(['/'])
  if (localStorage.getItem('token')) {
    let token_temp="";
     token_temp=localStorage.getItem("role");
     token_temp=token_temp.substring(1,token_temp.length-1);
     if(token_temp=="USER"){return true;}
     else{return false;}

   }
   else{
     this.router.navigate(['/error'],{state:{usertype:"User"}});
     return false;
   }
}

  }
    //end of canActivate

}
