import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notauthorized',
  templateUrl: './notauthorized.component.html',
  styleUrls: ['./notauthorized.component.css']
})
export class NotauthorizedComponent implements OnInit {
 name='';
  constructor(private router:Router) {
    //getting value from auth guard
    this.name=this.router.getCurrentNavigation().extras.state.usertype;
   }

  ngOnInit(): void {
  }

}
