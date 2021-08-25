import { Action } from '@ngrx/store'
import * as FlightActions from './../actions/flight.action'
import {Flight} from "../models/flight.model";

// const initialState: Flight = {
//   AirlineLogoAddress: "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/CZ.gif",
//   AirlineName: "Sami stroe",
//   InboundFlightsDuration: "24:10",
//   ItineraryId: "",
//   OutboundFlightsDuration: "26:20",
//   Stops: 2,
//   TotalAmount: 2903.84
// }
// Section 1
export function reducer(state: Flight[] = [], action: FlightActions.Actions) {

  // Section 2
  switch(action.type) {
    case FlightActions.ADD_FLIGHT:
      return [...state, action.payload];
    default:
      return state;
  }
}
