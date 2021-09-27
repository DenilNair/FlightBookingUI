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
import { AircraftComponent } from './aircraft/aircraft.component';
import { TicketComponent } from './ticket/ticket.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecurityComponent } from './security/security.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListFlightComponent,
    AircraftComponent,
    TicketComponent,
    ProfileComponent,
    SecurityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [flightDetailsServies,aircraftDetailsServies,SecurityComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
