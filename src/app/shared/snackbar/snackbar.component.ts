import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message): void {
    this._snackBar.open(message, 'X', {
      duration: 5000,
      panelClass: 'success-dialog',
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }
}
