import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as DashboardActions from './dashboard.action';
import { DashboardState } from './dashboard.state';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  isMenuOpened = false;

  statistics$: Observable<any>;

  statistics: any[] = [];

  constructor( private _store: Store<DashboardState> ) {
    this.statistics$ = this._store.select('dashboard');

    this.statistics$.subscribe(data => {
      this.statistics = data.statistics;
    });
  }

  getStatistics() {
    this._store.dispatch(new DashboardActions.GetStatistics());
  }

  toggleMenu() {
    this.isMenuOpened  = !this.isMenuOpened;
  }

}
