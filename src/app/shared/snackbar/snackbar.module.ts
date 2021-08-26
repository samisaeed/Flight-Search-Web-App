import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar.component';
import {MatSnackBar} from "@angular/material/snack-bar";



@NgModule({
  declarations: [
    SnackbarComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[MatSnackBar]
})
export class SnackbarModule { }
