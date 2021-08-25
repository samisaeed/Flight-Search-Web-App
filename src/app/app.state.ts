import {Flight} from "./store/models/flight.model";

export interface AppState {
  readonly flight: Flight[];
}
