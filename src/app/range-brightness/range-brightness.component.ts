import { Component, OnInit } from '@angular/core';
import {
  OnsenModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import * as ons from 'onsenui';
import * as JSON5 from 'JSON5';

@Component({
  selector: 'app-range-brightness',
  templateUrl: './range-brightness.component.html',
  styleUrls: ['./range-brightness.component.css']
})
export class RangeBrightnessComponent implements OnInit {
  // brightness of led strip, represents max brightness if fading is activated
  brightness: number = 0;
  // defines whether night time fading mode is active, will activate second range element
  fadingOn: boolean = true;
  // brightness of led strip after sunset hours, represents min brightness
  brightnessMin: number = 0;

  // TODO test weather conditions output
  weather_conditions: string = "<no data>";

  constructor() { }


  ngOnInit(): void {
    // initiate brightness values
    this.getBrightnessCatatumbo();

    //regular checking Catatumbo brightness every minute
    setInterval(this.getBrightnessCatatumbo, 60000);
  }

  /**************************
   *        UI EVENTS       *
   **************************/

  /*
   *  UI event based any of the two range elements
   */
  brightnessChanged(event) {
    // minimum value to be restricted by defined maximum value
    if (this.brightnessMin >= this.brightness)
      this.brightnessMin = this.brightness;

    // send updated brightness values
    this.setBrightnessCatatumbo();
  }

  /**************************
   *    UTILITY METHOD      *
   **************************/

   /*
    *  request current brightness value of the led strip
    *  updates the brightness values of the range element parsed from the response
    *  response format: {maxBrightness: 0.7, curBrightness: 0.2, minBrightness: 0.15}
    */
  getBrightnessCatatumbo() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4)
      {
        if(xhr.status == 200)
        {
            var arr = JSON5.parse(xhr.responseText);

            // if minBrightness is not defined, sunrise/sunset fading is turned off
            if (arr['minBrightness'] == null)
            {
              this.brightness = 100 * arr['maxBrightness'];
              this.brightnessMin = 0;
              this.fadingOn = false;
            }
            else
            {
              this.brightness = 100 * arr['maxBrightness'];
              this.brightnessMin = 100 * arr['minBrightness'];
              this.fadingOn = true;
            }
        }
        else
          this.toastState(false);
      }
    }.bind(this);
    // TODO set url dynamically - check global variable: https://stackoverflow.com/questions/43991306/angular-4-5-6-global-variables
    xhr.open("GET", "http://192.168.178.55:8080/catatumbo/config/adafruit/getBrightness", true);
    //xhr.open("GET", "./catatumbo/config/adafruit/getBrightness", true);
    xhr.send();
  }

  /*
   *  This will trigger a communication with Catatumbo device for setting brightness values
   */
  setBrightnessCatatumbo() {
    // ##### CORS CONFIG REQUEST ####
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
      if (xhr.readyState == 4)
      {
        if(xhr.status == 200)
          this.toastState(true);
        else
          this.toastState(false);
      }
		}.bind(this);
    // bring brightness configuration into JSON5 format and send
    // minBrightness will only be sent if sunset fading is turned on
    var ret = {
      'minBrightness' : this.fadingOn ? this.brightnessMin : null,
      'maxBrightness' : this.brightness
    };
    // TODO set url dynamically - check global variable: https://stackoverflow.com/questions/43991306/angular-4-5-6-global-variables
		xhr.open("POST", "http://192.168.178.55:8080/catatumbo/config/adafruit/setBrightness");
    //xhr.open("POST", "./catatumbo/config/adafruit/setBrightness");
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(JSON5.stringify(ret));
  }

  /*
   *  triggered by backend update
   *  notifies user about failed or succeeded update
   */
  toastState(success) {
    var str

    if (success)
      str = 'update successful'
    else
      // TODO set url dynamically
      str = 'connection failed'

    ons.notification.toast(str, {timeout: 1000});
  }
}
