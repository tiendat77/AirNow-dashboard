import { Component, OnInit } from '@angular/core';

import { DashboardService } from 'src/lib/dashboard/store/dashboard.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  constructor( public dashboardService: DashboardService ) { }

  ngOnInit() {
    this.dashboardService.getForecast();
  }

}
