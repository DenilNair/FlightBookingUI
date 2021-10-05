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
    BookTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule, ToastrModule.forRoot()
  ],
  providers: [flightDetailsServies,aircraftDetailsServies,SecurityComponent,DatePipe,TicketDetails,alertServies],
  bootstrap: [AppComponent]
})
export class AppModule { }
