import { Component, OnInit } from '@angular/core';
import {
  OnsenModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import * as ons from 'onsenui';
import { OnsNavigator } from 'ngx-onsenui';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  title:string;

  // Get a way to access `ons-navigator` by Dependency Injection (DI)
  // https://onsen.io/v2/guide/angular2/
  constructor(public navigator: OnsNavigator) {
    console.log("#####################");

    console.log(navigator.element.page);
  }

  ngOnInit(): void {
    //TODO string property
    this.title = 'Catatumbo'
  }

  showHelpDialog() {
    ons.notification.alert('Hello, world!');
  }
}
