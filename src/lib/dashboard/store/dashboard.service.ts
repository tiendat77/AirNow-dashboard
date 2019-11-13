import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';

import * as DashboardActions from './dashboard.action';
import { DashboardState } from './dashboard.state';

import { getStatistics, getForecast, getLocations, getAqi, getTemperature, getHumidity } from './dashboard.selector';
import { IAppState } from '../type/app-state';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  isMenuOpened = false;
  statistics$: Observable<any>;
  forecast$: Observable<any>;
  locations$: Observable<any>;
  aqi$: Observable<any>;
  temperature$: Observable<any>;
  humidity$: Observable<any>;

  statistics: any[] = [];
  forecast: any[] = [];
  aqi: any[] = [];
  temperature: any[] = [];
  humidity: any[] = [];
  locations: any[] = [];

  // tslint:disable-next-line: variable-name
  constructor( private _store: Store<IAppState> ) {
    this.statistics$ = this._store.pipe(getStatistics());
    this.forecast$ = this._store.pipe(getForecast());
    this.locations$ = this._store.pipe(getLocations());
    this.aqi$ = this._store.pipe(getAqi());
    this.temperature$ = this._store.pipe(getTemperature());
    this.humidity$ = this._store.pipe(getHumidity());

    this.statistics$.subscribe(data => this.statistics = data);
    this.locations$.subscribe(data => this.locations = data);
    this.forecast$.subscribe(data => this.forecast = data);
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

  getAir(params) {
    this._store.dispatch(new DashboardActions.GetAQI(params));
    this._store.dispatch(new DashboardActions.GetTemperature(params));
    this._store.dispatch(new DashboardActions.GetHumidity(params));
  }

  getLocations() {
    this._store.dispatch(new DashboardActions.GetLocation());
  }

  toggleMenu() {
    this.isMenuOpened  = !this.isMenuOpened;
  }

}
