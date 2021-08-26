import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {DataService} from "../../../shared/services/dataService/data.service";

@Injectable()
export class FlightService extends DataService{

  constructor(http: HttpClient) {
    super(http, 'flight');
  }



  // getAllFlightData(): Observable<any> {
  //   return this.http.get(`${environment.baseUrl}flight`);
  // }
}
