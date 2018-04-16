import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import {StartupService, init_app, get_settings} from './core/index';
import {HttpClientModule} from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {EnricherModule} from "./enricher/enricher.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    EnricherModule
  ],
  exports: [],
  providers: [
    StartupService,
    /*{ provide: APP_INITIALIZER, useFactory: init_app, deps: [StartupService], multi: true },*/
    { provide: APP_INITIALIZER, useFactory: get_settings, deps: [StartupService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('called AppModule');
  }
}
