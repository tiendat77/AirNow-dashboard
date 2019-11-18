import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { DashboardService } from '../../store/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  locationCtrl = new FormControl();
  currentLocation = '';
  filteredLocations: Observable<any>;
  ranges = [
    { id: 1, value: '1 day' },
    { id: 7, value: '7 days' },
    { id: 30, value: '30 days' },
    { id: 100, value: 'Last 100' },
  ];

  constructor(
    public dashboardService: DashboardService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.dashboardService.getData();

    this.filteredLocations = this.locationCtrl.valueChanges.pipe(
      startWith(''),
      map(name => name ? this.filterLocation(name) : this.dashboardService.locations)
    );
  }

  generate() { // this function just for test - delete it
    const limit = 1000;
    let y = 0;
    const dataPoints = [];
    for (let i = 0; i < limit; i += 1) {
      y += (Math.random() * 10 - 5);
      dataPoints.push({
        x: i - limit / 2,
        y: y
      });
    }

    return dataPoints;
  }

  filterLocation(value: string) {
    const search = value.toLowerCase();
    return this.dashboardService.locations.filter(d => d.toLowerCase().indexOf(search) === 0);

  }

  onSelectLocation(location) {
    if (location) {
      this.currentLocation = location;
    }
  }

  onSelectRange(id: number) {
    const params = {};

    if (this.currentLocation !== '') {
      params['location'] = this.currentLocation;
    }

    if (id) {
      params['range'] = id.toString();
    }

    this.updateUrlParams(params);
    console.log('param ', params);
    this.dashboardService.getAir(params);
  }

  updateUrlParams(params) {
    const routerParameter = {};

    if (params && (params.range || params.location)) {
      if (params.range) {
        routerParameter['range'] = params.range;
      }

      if (params.location) {
        routerParameter['location'] = params.location;
      }

      this.router.navigate(['/dashboard/home', routerParameter]);
    }
  }

}
