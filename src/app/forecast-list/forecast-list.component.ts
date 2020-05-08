import { Component, OnInit } from '@angular/core';
import * as JSON5 from 'json5';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.css']
})
export class ForecastListComponent implements OnInit {

  weather_conditions = [];

  toggle = true;

  constructor() { }

  ngOnInit(): void {
    // initiate weather condition values
    this.getWeatherConditionCatatumbo();

    //regular checking Catatumbo weather conditions every 5 minutes
    setInterval(this.getWeatherConditionCatatumbo, 300000);
  }

  /**************************
   *    UTILITY METHOD      *
   **************************/

   /*
    * request current weather conditions of led strip
    */
  getWeatherConditionCatatumbo() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4)
      {
        if(xhr.status == 200)
        {
            // get full-fledged weather condition data
            // format: [<ID>, {"timestamp" : <timestamp>, "rain" : rain, ...}]
            var wc = Object.entries(JSON5.parse(xhr.responseText));
            // initialize weather condition set
            this.weather_conditions = [];

            //extract and convert relevant weather condition information
            wc.forEach(element => {
              this.weather_conditions.push({
                id:         element[0],
                //TODO locale specific date formatting
                date:       new Date(element[1]['timestamp']).toLocaleDateString("de-DE", {weekday: 'short', day: 'numeric', month: 'numeric'}),
                //this is for pure dynamic rendering prupose to identify next section of dates
                day:       new Date(element[1]['timestamp']).toLocaleDateString("de-DE", {day: 'numeric'}),
                //TODO locale specific time formatting
                time:       new Date(element[1]['timestamp']).toLocaleTimeString("de-DE", {hour: 'numeric', minute: 'numeric'}),
                //Catatumbo internal mapping code
                // each weather condition based on rain, cloud coverage and temperature is mapped into discrete number of condition states
                // that are indicated by different colors on the LED strip
                // storm: digit 6, big endian
                // snow: digit 5, big endian
                // temperature: digit 4-3, big endian
                // rain/cloud: digit 2-0, big endian
                CATAcode:   element[1]['CATAcode'],
                //OWM internal code - more detailed states
                // required for icon mapping
                OWMcode:    element[1]['OWMcode'],
                //temperature in Celsius
                temp:       element[1]['temp'],
                //amount of rain on mm/sqm
                rain:       element[1]['rain'],
                //percentage of cloud coverage
                cloud:      element[1]['cloud'],
                //wind speed m/s
                wind:       element[1]['wind'],
                //humidity in percentage
                humidity:   element[1]['humidity'],
                //athmosperic pressure in hPa
                pressure:   element[1]['pressure'],
                //Catatumbo color code more weather state based on descrete states
                color:      element[1]['color']
              });
            });
        }
        else
          this.toastState(false);
      }
    }.bind(this);

	//request data from local endpoint on port 8080
    xhr.open("GET", location.protocol + "//" + location.hostname + ":8080" + "/catatumbo/forecast/getConditions", true);
    xhr.send();
  }
}
