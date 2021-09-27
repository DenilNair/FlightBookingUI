import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AircraftComponent } from './aircraft/aircraft.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'aircraft-component', component: AircraftComponent },
  { path: 'profile-component', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
