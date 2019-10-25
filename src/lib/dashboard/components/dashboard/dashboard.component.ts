import { Component, OnInit } from '@angular/core';

import * as MOCK from '../mock/mock';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // This for test
  statistic = MOCK.STATISTIC;
  data = MOCK.CHART;

  constructor() { }

  ngOnInit() {
  }

}
