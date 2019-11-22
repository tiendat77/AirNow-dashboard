import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UserActions from './user.actions';
import { UserService } from './user.service';

@Injectable()
export class UserEffect {

  // SERVER_URL = 'http://13.59.35.198:8000/admin/';
  SERVER_URL = 'http://127.0.0.1:8000/admin/';

  constructor(
    private _action$: Actions,
    private http: HttpClient,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  @Effect()
  getData = this._action$.pipe(
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
          this.pushNotification('Error occoured. Please try again!');
          return of();
        })
      )
    )
  );

  @Effect()
  createUser = this._action$.pipe(
    ofType(UserActions.USER_CREATE),
    map((action: any) => action.payload),
    switchMap((payload: any) => {
      const user = payload;
      user.code = '93cf8cb6e31a3c5fddc70e8a0bb86075';
      console.log('code: ', user);
      return of(user);
    }),
    switchMap((body: any) =>
      this.http.post(this.SERVER_URL + '/createUser', body).pipe(
        map((data: any) => {
          this.pushNotification('User '+ body.username + ' created!');
          return new UserActions.GetData();
        }),
        catchError((error) => {
          console.error(error);
          this.pushNotification('Error occoured. Please try again!');
          return of()
        })
      )
    )
  );

  @Effect()
  updateUser = this._action$.pipe(
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
          return new UserActions.GetData();
        }),
        catchError((error) => {
          console.error(error);
          this.pushNotification('Error occoured. Please try again!');
          return of()
        })
      )
    )
  );

  @Effect()
  changePassword = this._action$.pipe(
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
          return new UserActions.GetData();
        }),
        catchError((error) => {
          console.error(error);
          this.pushNotification('Error occoured. Please try again!');
          return of()
        })
      )
    )
  );

  @Effect()
  removeUser = this._action$.pipe(
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
          return new UserActions.GetData();
        }),
        catchError((error) => {
          console.error(error);
          this.pushNotification('Error occoured. Please try again!');
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