import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlightService} from "./moduels/services/flightService/flight.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ExtraOptions, PreloadAllModules, RouterModule} from "@angular/router";
import {appRoutes} from "./app.routing";
import {LoaderInterceptor} from "./core/interceptor/loader.interceptor";
import {AuthGuard} from "./core/Guard/auth.guard";
import {reducer} from "./store/reducers/flight.reducer";
import {StoreModule} from "@ngrx/store";

const routerConfig: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  preloadingStrategy       : PreloadAllModules
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, routerConfig),
    StoreModule.forRoot({
      flight: reducer
    }),
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    FlightService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
