import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OnsenModule } from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ModeSelectorComponent } from './mode-selector/mode-selector.component';
import { RangeBrightnessComponent } from './range-brightness/range-brightness.component';
import { ForecastListComponent } from './forecast-list/forecast-list.component';
import { ViewMainComponent } from './view-main/view-main.component';
import { ViewForecastComponent } from './view-forecast/view-forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ModeSelectorComponent,
    RangeBrightnessComponent,
    ForecastListComponent,
    ViewMainComponent,
    ViewForecastComponent
  ],
  imports: [
    BrowserModule,
    OnsenModule,
    AppRoutingModule
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
