import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';

import * as DashboardActions from './dashboard.action';

import { getStatistics, getForecast, getLocations, getAqi, getTemperature, getHumidity } from './dashboard.selector';
import { IAppState } from '../../type/app-state';

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

  aqi: any[] = [];
  temperature: any[] = [];
  humidity: any[] = [];
  locations: any[] = [];

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // tslint:disable-next-line: variable-name
  constructor( private _store: Store<IAppState> ) {
    this.statistics$ = this._store.pipe(getStatistics());
    this.forecast$ = this._store.pipe(getForecast());
    this.locations$ = this._store.pipe(getLocations());
    this.aqi$ = this._store.pipe(getAqi());
    this.temperature$ = this._store.pipe(getTemperature());
    this.humidity$ = this._store.pipe(getHumidity());

  }

  getData() {
    this.isLoading.next(true);
    this._store.dispatch(new DashboardActions.GetStatistics());
    this._store.dispatch(new DashboardActions.GetLocation());
  }

  getForecast() {
    this.isLoading.next(true);
    this._store.dispatch(new DashboardActions.GetForecast());
  }

  getAir(params) {
    this.isLoading.next(true);
    this._store.dispatch(new DashboardActions.GetAir(params));
  }

  toggleMenu() {
    this.isMenuOpened  = !this.isMenuOpened;
  }

}
