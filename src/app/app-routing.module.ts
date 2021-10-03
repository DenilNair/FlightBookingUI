import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AircraftComponent } from './aircraft/aircraft.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './services/auth.guard';
import { NotauthorizedComponent } from './notauthorized/notauthorized.component';
import { TicketComponent } from './ticket/ticket.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { AppComponent } from './app.component';
const routes: Routes = [
  { path: 'aircraft-component',
  canActivate: [AuthGuard],
  component: AircraftComponent },
  { path: 'profile-component',canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'ticket-component',canActivate: [AuthGuard], component: TicketComponent },
  { path: 'error', component: NotauthorizedComponent },
  { path: 'book-ticket',canActivate: [AuthGuard], component: BookTicketComponent },
  { path: 'home', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
