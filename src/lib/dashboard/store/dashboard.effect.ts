import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import * as DashboardActions from './dashboard.action';
import { DashboardState } from './dashboard.state';

@Injectable()
export class DashboardEffect {

  SERVER_URL = 'http://13.59.35.198:8000/api/';
  // SERVER_URL = 'http://127.0.0.1:8000/api/';

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
    switchMap(action =>
      this.http.get(this.SERVER_URL + 'statistics')
        .pipe(
          map((data: any) => {
            return new DashboardActions.GetStatisticsSuccess(data.statistics);
          }),
          catchError((error) => {
            console.error(error);
            return of();
          })
        )
      )
  );

  @Effect()
  GetForecast = this._actions$.pipe(
    ofType(DashboardActions.GET_FORECAST),
    switchMap(() =>
      this.http.get(this.SERVER_URL + 'forecast')
        .pipe(
          map((data: any) => {
            const forecast = data.forecast;
            return new DashboardActions.GetForecastSuccess(forecast);
          }),
          catchError((error) => {
            console.error(error);
            return of();
          })
        )
    )
  );

  @Effect()
  GetAQI = this._actions$.pipe(
    ofType(DashboardActions.GET_AQI),
    switchMap((action: any) =>
      this.http.get(this.SERVER_URL + 'select-aqi', { params: new HttpParams().set('range', action.payload) }).pipe(
        map((data: any) => {
          return new DashboardActions.GetAQISuccess(data.aqi);
        }),
        catchError((error) => {
          console.error(error);
          return of();
        })
      )
    )
  );

  @Effect()
  GetLocations = this._actions$.pipe(
    ofType(DashboardActions.GET_LOCATION),
    switchMap(() =>
      this.http.get(this.SERVER_URL + 'locations').pipe(
        map((data: any) => new DashboardActions.GetLocationSuccess(data.locations)),
        catchError((error) => {
          console.error(error);
          return of();
        })
    ))
  );

}

