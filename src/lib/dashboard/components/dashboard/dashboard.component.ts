import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  chartForm: FormGroup;

  filteredLocations: Observable<any>;
  ranges = [
    { id: 1, value: '1 day' },
    { id: 7, value: '7 days' },
    { id: 30, value: '30 days' },
    { id: 100, value: 'Last 100' },
  ];

  constructor(
    public dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.chartForm = this.formBuilder.group({
      locationCtrl: new FormControl(''),
      rangeCtrl: new FormControl('')
    });

    this.dashboardService.getData();

    this.dashboardService.locations$.subscribe(data => {
      console.log('subscribe location');
      this.dashboardService.locations = data;
      this.filteredLocations = this.chartForm.get('locationCtrl').valueChanges.pipe(
        startWith(''),
        map(name => name ? this.filterLocation(name) : this.dashboardService.locations)
      );
    });

  }

  filterLocation(value: string) {
    const search = value.toLowerCase();
    return this.dashboardService.locations.filter(d => d.toLowerCase().indexOf(search) === 0);
  }

  getAir() {
    if (!this.isNull(this.rangeCtrl.value) && !this.isNull(this.locationCtrl.value)) {
      const params = {};
      params['location'] = this.locationCtrl.value;
      params['range'] =  this.rangeCtrl.value;
      this.updateUrlParams(params);
      this.dashboardService.getAir(params);
    }
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

  isNull(data: any) {
    return data === undefined || data === null || data.length === 0;
  }

  get locationCtrl() { return this.chartForm.get('locationCtrl') }
  get rangeCtrl() { return this.chartForm.get('rangeCtrl') }

}
