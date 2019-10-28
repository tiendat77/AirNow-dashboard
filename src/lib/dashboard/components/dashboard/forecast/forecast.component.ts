import { Component, OnInit } from '@angular/core';

import * as MOCK from '../../mock/mock';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  forecast = MOCK.FORE_CAST;

  constructor() { }

  ngOnInit() {
  }

}
