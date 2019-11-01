import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import * as MOCK from '../mock/mock';
import { DataService } from '../../services/data.service';
import { DashboardService } from '../../store/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  // This for test
  statistic = MOCK.STATISTIC;
  aqi = MOCK.AQI;
  temperature = MOCK.TEMPERATURE;
  humidity = MOCK.HUMIDITY;

  constructor(
    public dataService: DataService,
    public dashboardService: DashboardService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dashboardService.getStatistics();
  }

  test() {
    console.log('TEST: ', this.dashboardService.statistics);
  }
}
