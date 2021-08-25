// Section 1
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import {Flight} from "../models/flight.model";

// Section 2
export const ADD_FLIGHT       = '[FLIGHT] Add'
export const REMOVE_FLIGHT    = '[FLIGHT] Remove'

// Section 3
export class AddFlight implements Action {
  readonly type = ADD_FLIGHT

  constructor(public payload: Flight[]) {}
}

export class RemoveFlight implements Action {
  readonly type = REMOVE_FLIGHT

  constructor(public payload: number) {}
}

// Section 4
export type Actions = AddFlight | RemoveFlight
