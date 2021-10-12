import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { ListFlightComponent } from './list-flight/list-flight.component';
import {FormsModule} from '@angular/forms';

import { ReactiveFormsModule} from '@angular/forms';
//import servies
import { flightDetailsServies } from './services/flightDetailsServices';
import { aircraftDetailsServies } from './services/aircraftDetailsServices';
import { alertServies } from './services/alertService';
import { TicketDetails } from './classes/TicketDetails';
import { AircraftComponent } from './aircraft/aircraft.component';
import { TicketComponent } from './ticket/ticket.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecurityComponent } from './security/security.component';
//import {MatCardModule } from '@angular/material/card';
import { AngularMaterialModule } from './angular-material.module';
//import {  MatAutocompleteModule } from '@angular/material/autocomplete';

import { ToastrModule } from 'ngx-toastr';
import { NotauthorizedComponent } from './notauthorized/notauthorized.component';
import { DatePipe } from '@angular/common';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { UserDetails } from './classes/UserDetails';
import { AirportListService } from './services/airportListServices';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { LoadComponentService } from './services/loadComponentService';
import { BookingDetails } from './classes/BookingDetails';
import { ProfileService } from './services/ProfileService';
import { ProfileDetails } from './classes/ProfileDetails';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';


@NgModule({
  declarations: [
AppComponent,
    SearchComponent,
    ListFlightComponent,
    AircraftComponent,
    TicketComponent,
    ProfileComponent,
    SecurityComponent,
    NotauthorizedComponent,
    BookTicketComponent,
    TicketDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule, ToastrModule.forRoot(),
    AutocompleteLibModule,

  ],
  providers: [flightDetailsServies,aircraftDetailsServies,SecurityComponent,DatePipe,TicketDetails,alertServies,UserDetails,AirportListService,SearchComponent,LoadComponentService
  ,BookingDetails,ProfileService,ProfileDetails],
  bootstrap: [AppComponent]
})
export class AppModule { }
