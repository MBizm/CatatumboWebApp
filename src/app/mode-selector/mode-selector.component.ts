import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import { ViewForecastComponent } from '../view-forecast/view-forecast.component';

@Component({
  selector: 'app-mode-selector',
  templateUrl: './mode-selector.component.html',
  styleUrls: ['./mode-selector.component.css']
})
export class ModeSelectorComponent implements OnInit {

  imgSrc: string = '';
  mode = 1;

  // Get a way to access `ons-navigator` by Dependency Injection (DI)
  // https://onsen.io/v2/guide/angular2/
  constructor(private navigator: OnsNavigator)
  {
  }

  ngOnInit(): void {
    // ##### INITIALIZATION ####
    this.onModeSelect(event, 1);
  }

  // ##### EVENTS - MODE SELECTOR - LIST ####
  onModeSelect(event, mid) {
    this.mode = mid;

    switch (mid) {
      case 1:
        //forecast
        this.imgSrc = 'assets/clouds-449822_640.jpg';
        console.log(this.navigator.element.pages);
        this.navigator.element.pushPage(ViewForecastComponent);
        console.log(this.navigator.element.pages);

        break;
      case 2:
        //share
        this.imgSrc = 'assets/chart-1905225_640.jpg';
        break;
      //TODO define unselected properties
      default:
        this.mode = 0
        this.imgSrc = 'none'
    }
  }
}
