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
  ];

  constructor(
    public dashboardService: DashboardService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dashboardService.getData();

    this.filteredLocations = this.locationCtrl.valueChanges.pipe(
      startWith(''),
      map(name => name ? this.filterLocation(name) : this.dashboardService.locations)
    );
  }

  filterLocation(value: string) {
    const search = value.toLowerCase();
    return this.dashboardService.locations.filter(d => d.toLowerCase().indexOf(search) === 0);

  }

  onSelectLocation(location) {
    console.log('select location ', location);
    if (!location) {
      this.currentLocation = location;
    }
    console.log('aqi$', this.dashboardService.aqi$);
  }

  onSelectRange(id: number) {
    console.log('select range = ', id);
    const params = {};

    if (this.currentLocation !== '') {
      params['location'] = this.currentLocation;
    }

    if (id) {
      params['range'] = id.toString();
    }

    // this.updateUrlParams(params);
    this.dashboardService.getAir(params);
  }

  updateUrlParams(params) {
    const routerParameter = {};

    if (!params && (!params.range || !params.location)) {
      if (params.range) {
        routerParameter['range'] = params.range;
      }

      if (params.location) {
        routerParameter['location'] = params.location;
      }

      this.router.navigate(['/dashboar', routerParameter]);
    }
  }

}
