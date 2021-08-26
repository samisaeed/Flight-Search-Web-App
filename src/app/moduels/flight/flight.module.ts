import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightComponent } from './flight.component';
import {RouterModule, Routes} from "@angular/router";
import {AppModule} from "../../app.module";
import {DataTableModule} from "../../shared/data-table/data-table.module";
import {FlightService} from "../services/flightService/flight.service";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {AddFlightComponent} from "./add-flight/add-flight.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SnackbarComponent} from "../../shared/snackbar/snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

const routes: Routes = [
  {
    path: '',
    component: FlightComponent
  },
];

@NgModule({
  declarations: [
    FlightComponent,
    AddFlightComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTableModule,
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
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  providers: [FlightService, SnackbarComponent, MatSnackBar],
})
export class FlightModule { }
