import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as DashboardActions from './dashboard.action';
import { DashboardState } from './dashboard.state';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  isMenuOpened = false;
  aqi$ = new BehaviorSubject([]);

  statistics: any[] = [];
  forecast: any[] = [];
  aqi: any[] = [];
  temperature: any[] = [];
  humidity: any[] = [];
  locations: any[] = [];

  // tslint:disable-next-line: variable-name
  constructor( private _store: Store<DashboardState> ) {
    this._store.select('dashboard').subscribe(data => {
      this.statistics = data.statistics;
    });

    this._store.select('dashboard').subscribe((data: any) => {
      this.forecast = data.forecast;
    });

    this._store.select('dashboard').subscribe((data: any) => {
      this.aqi$.next(data.aqi);
    });

    this._store.select('dashboard').subscribe((data: any) => {
      this.temperature = data.temperature;
    });

    this._store.select('dashboard').subscribe((data: any) => {
      this.humidity = data.humidity;
    });

    this._store.select('dashboard').subscribe((data: any) => {
      this.locations = data.locations;
    });

  }

  getData() {
    this._store.dispatch(new DashboardActions.GetStatistics());
    this._store.dispatch(new DashboardActions.GetLocation());
  }

  getStatistics() {
    this._store.dispatch(new DashboardActions.GetStatistics());
  }

  getForecast() {
    this._store.dispatch(new DashboardActions.GetForecast());
  }

  getAqi(range: number) {
    this._store.dispatch(new DashboardActions.GetAQI(range));
  }

  getTemperature() {
    this._store.dispatch(new DashboardActions.GetTemperature());
  }

  getHumidity() {
    this._store.dispatch(new DashboardActions.GetHumidity());
  }

  getAir(params) {
    this._store.dispatch(new DashboardActions.GetAQI(params));
    this._store.dispatch(new DashboardActions.GetTemperature());
    this._store.dispatch(new DashboardActions.GetHumidity());
  }

  getLocations() {
    this._store.dispatch(new DashboardActions.GetLocation());
  }

  toggleMenu() {
    this.isMenuOpened  = !this.isMenuOpened;
  }

}
