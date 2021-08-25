import {Routes} from "@angular/router";

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./moduels/flight/flight.module').then(m => m.FlightModule),
  },
  {
    path: 'flight',
    loadChildren: () =>
      import('./moduels/flight/flight.module').then(m => m.FlightModule),
  },
];
