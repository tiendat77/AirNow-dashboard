import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import * as MOCK from '../mock/mock';
import { DataService } from '../../services/data.service';

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
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }
}
