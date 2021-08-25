import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css'],
  providers: [DatePipe],
})
export class AddFlightComponent implements OnInit {
  form: FormGroup;
  @Output() sendFlightData = new EventEmitter<any>();

  constructor(private _fb: FormBuilder,) { }

  ngOnInit(): void {
    this.setFormConfig();
  }

  setFormConfig(): void {
    this.form = this._fb.group({
      DepartureAirportCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      ArrivalAirportCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      DepartureDate: [''],
      ReturnDate: [''],
    });
  }

  // @ts-ignore
  hasError = (controlName: string, errorName: string) => {
    const controls = this.form.controls;
    if (controls[controlName].touched || controls[controlName].touched) {
      return this.form.controls[controlName].hasError(errorName);
    }
  }
  get DepartureAirportCodeControl() {
    return this.form.get('DepartureAirportCode');
  }

  onSaveFlightClick(): void {
    this.sendFlightData.emit(this.form.value);
  }
}
