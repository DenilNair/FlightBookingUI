import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/ProfileService';
import { ProfileDetails } from '../classes/ProfileDetails';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profile:ProfileService,private profiledetails:ProfileDetails) { }

  profiledata:ProfileDetails;
  updated:any;
  userrole:any;
  ngOnInit(): void {
    debugger
    let token =localStorage.getItem('token');
    token=token.substring(1,token.length-1);
    let userRole=localStorage.getItem("role");
    userRole=userRole.substring(1,userRole.length-1);
    this.userrole=userRole;
    this.profile.getProfile(token).subscribe((data) => {

      this.profiledata = JSON.parse(data.toString());


    },

    (error) => {

      console.log('accessWithToken error found' + error.error.text);
    })
  }

  SaveChanges(data){
    console.log("chages saved");
    let token =localStorage.getItem('token');
    token=token.substring(1,token.length-1);
    this.profile.setProfile(data,token).subscribe((data) => {
      this.updated = data;

    },

    (error) => {

      console.log('accessWithToken error found' + error.error.text);
    })

  }
}
