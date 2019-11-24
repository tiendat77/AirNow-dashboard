import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import  { environment } from '../../../../environments/environment';

import * as DashboardActions from './dashboard.action';

@Injectable()
export class DashboardEffect {

  SERVER_URL = environment.DashboarAPI;

  constructor(
    // tslint:disable: variable-name
    private _actions$: Actions,
    private snackbar: MatSnackBar,
    private http: HttpClient
  ) { }

  @Effect()
  GetStatistics = this._actions$.pipe(
    ofType(DashboardActions.GET_STATISTICS),
    switchMap(action =>
      this.http.get(this.SERVER_URL + 'statistics')
        .pipe(
          map((data: any) => {
            return new DashboardActions.FetchStatistic(data.statistics);
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
            return new DashboardActions.FetchForecast(forecast);
          }),
          catchError((error) => {
            console.error(error);
            return of();
          })
        )
    )
  );

  @Effect()
  GetAir = this._actions$.pipe(
    ofType(DashboardActions.GET_AIR),
    map((action: any) => action.payload),
    switchMap((payload: any) => {
      const params = new HttpParams()
      .append('range', payload.range)
      .append('location', payload.location);
    return of(params);
    }),
    switchMap((params) =>
      this.http.get(this.SERVER_URL + 'airdata', { params }).pipe(
        map((data: any) => {
          if (data.aqi.length === 0 ) {
            this.pushNotification('No data in this range!');
            return new DashboardActions.FetchAir(data);
          } else {
            return new DashboardActions.FetchAir(data);
          }
        }),
        catchError((error) => {
          console.error(error);
          this.pushNotification('Error has occurred. Please try again!');
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
        map((data: any) => {
          return new DashboardActions.FetchLocation(data.locations);
        }),
        catchError((error) => {
          console.error(error);
          return of();
        })
    ))
  );

  pushNotification(message: string) {
    setTimeout(() => {
      this.snackbar.open(message, 'OK', { duration: 3000 });
    });
  }

}

