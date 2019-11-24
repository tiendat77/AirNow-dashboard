import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import  { environment } from '../../../../environments/environment';

import * as UserActions from './user.actions';
import { UserService } from './user.service';

@Injectable()
export class UserEffect {

  SERVER_URL = environment.AdminAPI;

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  @Effect()
  getData = this.action$.pipe(
    ofType(UserActions.GET_DATA),
    switchMap(() =>
      this.http.post(this.SERVER_URL + 'userList', { 'code': '93cf8cb6e31a3c5fddc70e8a0bb86075' }).pipe(
        map((data: any) => {
          this.userService.isLoading$.next(false);
          if (!data.dataList || data.dataList.length === 0) {
            this.pushNotification('User list is empty');
          }
          return new UserActions.FetchData(data.dataList);
        }),
        catchError(error => {
          console.error(error);
          this.userService.isLoading$.next(false);
          this.pushNotification('Error occoured. Please try again!');
          return of();
        })
      )
    )
  );

  @Effect()
  createUser = this.action$.pipe(
    ofType(UserActions.USER_CREATE),
    map((action: any) => action.payload),
    switchMap((payload: any) => {
      const user = payload;
      user.code = '93cf8cb6e31a3c5fddc70e8a0bb86075';
      return of(user);
    }),
    switchMap((body: any) =>
      this.http.post(this.SERVER_URL + '/createUser', body).pipe(
        map((data: any) => {
          this.pushNotification('User '+ body.username + ' created!');
          this.userService.isLoading$.next(false);
          return new UserActions.GetData();
        }),
        catchError((error) => {
          console.error(error);
          this.pushNotification('Error occoured. Please try again!');
          this.userService.isLoading$.next(false);
          return of()
        })
      )
    )
  );

  @Effect()
  updateUser = this.action$.pipe(
    ofType(UserActions.USER_UPDATE),
    map((action: any) => action.payload),
    switchMap((payload: any) => {
      const body = payload;
      body.code = '93cf8cb6e31a3c5fddc70e8a0bb86075';
      return of(body);
    }),
    switchMap((body: any) =>
      this.http.post(this.SERVER_URL + '/updateUser', body).pipe(
        map((data: any) => {
          this.pushNotification('User '+ body.username + ' updated!');
          this.userService.isLoading$.next(false);
          return new UserActions.GetData();
        }),
        catchError((error) => {
          console.error(error);
          this.pushNotification('Error occoured. Please try again!');
          this.userService.isLoading$.next(false);
          return of()
        })
      )
    )
  );

  @Effect()
  changePassword = this.action$.pipe(
    ofType(UserActions.USER_CHANGE_PASSWORD),
    map((action: any) => action.payload),
    switchMap((payload: any) => {
      const body = {
        code: '93cf8cb6e31a3c5fddc70e8a0bb86075',
        username: payload.username,
        password: payload.password
      }
      return of(body);
    }),
    switchMap((body: any) =>
      this.http.post(this.SERVER_URL + '/changePassword', body).pipe(
        map((data: any) => {
          this.pushNotification('Password of user '+ body.username + ' changed!');
          this.userService.isLoading$.next(false);
          return new UserActions.GetData();
        }),
        catchError((error) => {
          console.error(error);
          this.pushNotification('Error occoured. Please try again!');
          this.userService.isLoading$.next(false);
          return of()
        })
      )
    )
  );

  @Effect()
  removeUser = this.action$.pipe(
    ofType(UserActions.USER_REMOVE),
    map((action: any) => action.payload),
    switchMap((payload: any) => {
      const body = payload;
      body.code = '93cf8cb6e31a3c5fddc70e8a0bb86075';
      return of(body);
    }),
    switchMap((body: any) =>
      this.http.post(this.SERVER_URL + '/removeUser', body).pipe(
        map((data: any) => {
          this.pushNotification('User '+ body.username + ' removed!');
          this.userService.isLoading$.next(false);
          return new UserActions.GetData();
        }),
        catchError((error) => {
          console.error(error);
          this.pushNotification('Error occoured. Please try again!');
          this.userService.isLoading$.next(false);
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