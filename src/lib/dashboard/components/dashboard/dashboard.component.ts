import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { DashboardService } from './dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  locationCtrl = new FormControl('');

  filteredLocations: Observable<any>;
  ranges = [
    { id: 1, value: '1 day' },
    { id: 7, value: '7 days' },
    { id: 30, value: '30 days' },
    { id: 100, value: 'Last 100' },
  ];
  rangeCtrl;

  isFirstLoad = true;

  constructor(
    public dashboardService: DashboardService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    this.dashboardService.locations$.subscribe((data: any) => {
      if (data && data.length > 0) {
        this.dashboardService.locations = data;
        this.initUrlParams();
      }
    });

    this.dashboardService.getData();

    this.dashboardService.locations$.subscribe(data => {
      this.dashboardService.locations = data;
      this.filteredLocations = this.locationCtrl.valueChanges.pipe(
        startWith(''),
        map(name => name ? this.filterLocation(name) : this.dashboardService.locations)
      );
    });

    setInterval(() => {
      this.dashboardService.refreshAir();
    }, 1000 * 60 * 5) // 5 minute

  }

  filterLocation(value: string) {
    const search = value.toLowerCase();
    return this.dashboardService.locations.filter(d => d.toLowerCase().indexOf(search) === 0);
  }

  getAir() {
    if (!this.isNull(this.rangeCtrl) && !this.isNull(this.locationCtrl.value)) {
      const params = {};
      params['location'] = this.locationCtrl.value;
      params['range'] =  this.rangeCtrl;
      this.updateUrlParams(params);
      this.dashboardService.getAir(this.locationCtrl.value, this.rangeCtrl);
    }
  }

  initUrlParams() {
    const urlParams = combineLatest(
      this.activatedRoute.params,
      this.activatedRoute.queryParams,
      (params, queryParams) => ({ ...params, ...queryParams })
    );

    urlParams.subscribe((params: any) => {
      if (!Object.keys(params).length) {
        this.rangeCtrl = this.ranges[3].id;
        this.locationCtrl.setValue('Thủ Đức');
        this.getAir();
        return;
      }

      if (!this.isFirstLoad) {
        return;
      }

      this.isFirstLoad = false;

      if (params.range && params.location) {
        this.rangeCtrl = this.ranges.filter(d => d.id == params.range)[0].id;
        const location = this.dashboardService.locations.filter(d => d == params.location)[0];
        if (location) {
          this.locationCtrl.setValue(params.location);
        } else {
          this.router.navigate(['/dashboard/home'], { queryParams: {} });
        }
        this.getAir();
        return;
      }

    });

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

      this.router.navigate(['/dashboard/home'], { queryParams: routerParameter });
    }
  }

  isNull(data: any) {
    return data === undefined || data === null || data.length === 0;
  }

}
