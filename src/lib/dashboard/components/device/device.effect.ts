import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import  { environment } from '../../../../environments/environment';

import { DeviceService } from './device.service';
import * as DeviceActions from './device.action';

@Injectable()
export class DeviceEffect {

  SERVER_URL = environment.DeviceAPI;

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private deviceService: DeviceService,
    private snackBar: MatSnackBar,
  ) { }

  @Effect()
  getData = this.action$.pipe(
    ofType(DeviceActions.DEVICE_GET_DATA),
    switchMap(() =>
      this.http.post(this.SERVER_URL + 'deviceList', { 'code': '93cf8cb6e31a3c5fddc70e8a0bb86075' }).pipe(
        map((data: any) => {
          this.deviceService.isLoading$.next(false);
          if (!data.dataList || data.dataList.length === 0) {
            this.pushNotification('Device list is empty');
          }
          return new DeviceActions.FetchData(data.dataList);
        }),
        catchError(error => {
          console.error(error);
          this.deviceService.isLoading$.next(false);
          this.pushNotification('Error occoured. Please try again!');
          return of();
        })
      )
    )
  );

  @Effect()
  createDevice = this.action$.pipe(
    ofType(DeviceActions.DEVICE_CREATE),
    map((action: any) => action.payload),
    switchMap((payload: any) => {
      const body = payload;
      body.code = '93cf8cb6e31a3c5fddc70e8a0bb86075';
      return of(body);
    }),
    switchMap((body: any) =>
      this.http.post(this.SERVER_URL + '/createDevice', body).pipe(
        map((data: any) => {
          this.pushNotification('Device '+ body.id + ' created!');
          this.deviceService.isLoading$.next(false);
          return new DeviceActions.GetData();
        }),
        catchError((error: any) => {
          console.error(error);
          const message = error.error.error;
          if (message && error.status === 400) {
            this.pushNotification(message);
          } else {
            this.pushNotification('Error occoured. Please try again!');
          }
          this.deviceService.isLoading$.next(false);
          return of()
        })
      )
    )
  );

  @Effect()
  updateDevice = this.action$.pipe(
    ofType(DeviceActions.DEVICE_UPDATE),
    map((action: any) => action.payload),
    switchMap((payload: any) => {
      const body = payload;
      body.code = '93cf8cb6e31a3c5fddc70e8a0bb86075';
      return of(body);
    }),
    switchMap((body: any) =>
      this.http.post(this.SERVER_URL + '/updateDevice', body).pipe(
        map((data: any) => {
          this.pushNotification('Device '+ body.id + ' updated!');
          this.deviceService.isLoading$.next(false);
          return new DeviceActions.GetData();
        }),
        catchError((error) => {
          console.error(error);
          this.pushNotification('Error occoured. Please try again!');
          this.deviceService.isLoading$.next(false);
          return of()
        })
      )
    )
  );

  @Effect()
  removeDevice = this.action$.pipe(
    ofType(DeviceActions.DEVICE_REMOVE),
    map((action: any) => action.payload),
    switchMap((payload: any) => {
      const body = payload;
      body.code = '93cf8cb6e31a3c5fddc70e8a0bb86075';
      return of(body);
    }),
    switchMap((body: any) =>
      this.http.post(this.SERVER_URL + '/removeDevice', body).pipe(
        map((data: any) => {
          this.pushNotification('Device '+ body.id + ' removed!');
          this.deviceService.isLoading$.next(false);
          return new DeviceActions.GetData();
        }),
        catchError((error) => {
          console.error(error);
          this.pushNotification('Error occoured. Please try again!');
          this.deviceService.isLoading$.next(false);
          return of()
        })
      )
    )
  );

  pushNotification(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'OK', { duration: 3000 });
    });
  }

}