import { Component } from '@angular/core';
import { ViewMainComponent } from './view-main/view-main.component';
import { ViewForecastComponent } from './view-forecast/view-forecast.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [
    ViewMainComponent,
    ViewForecastComponent
  ]
})
export class AppComponent {
  title = 'CatatumboApp3';
  initialPage = ViewMainComponent;
}
