import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as DashboardActions from './dashboard.action';
import { DashboardState } from './dashboard.state';

@Injectable()
export class DashboardEffect {

  SERVER_URL = 'http://13.59.35.198:8000/api/';
  LOCAL_URL = 'http://127.0.0.1:8000/api/';

  constructor(
    // tslint:disable: variable-name
    private _actions$: Actions,
    private _snackbar: MatSnackBar,
    private _store: Store<DashboardState>,
    private http: HttpClient
  ) { }

  @Effect()
  GetStatistics = this._actions$.pipe(
    ofType(DashboardActions.GET_STATISTICS),
    mergeMap(action =>
      this.http.get(this.SERVER_URL + 'statistics')
        .pipe(
          map((data: any) => {
            console.log(data.statistics);
            return new DashboardActions.GetStatisticsSuccess(data.statistics);
          }),
          catchError((error) => {
            console.error(error);
            return of();
          })
        )
      )
  );
}

