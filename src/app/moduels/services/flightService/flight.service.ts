import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class FlightService {

  constructor(private  http: HttpClient) { }
  getAllFlightData(): Observable<any> {
    return this.http.get(`http://nmflightapi.azurewebsites.net/api/flight`);
  }
}
