import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../dashboard.service';

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

  getLevel(status: string): number {
    let level;
    switch (status) {
      case 'Good': {
        level = 0;
        break;
      }

      case 'Moderate': {
        level = 1;
        break;
      }

      case 'Unhealthy for Sensitive Groups': {
        level = 2;
        break;
      }

      case 'Unhealthy': {
        level = 3;
        break;
      }

      case 'Very Unhealthy': {
        level = 4;
        break;
      }
    }
    return level;
  }


}
