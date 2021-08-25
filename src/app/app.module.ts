import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataTableModule} from "./shared/data-table/data-table.module";
import {FlightService} from "./services/flightService/flight.service";
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from "@angular/flex-layout";
import {MatInputModule} from '@angular/material/input';
import { AddFlightComponent } from './components/add-flight/add-flight.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddFlightComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DataTableModule,
    HttpClientModule,
    MatButtonModule,
    FlexModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [FlightService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
