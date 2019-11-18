import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as UserActions from './user.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class UserEffect {

  // SERVER_URL = 'http://13.59.35.198:8000/admin/';
  SERVER_URL = 'http://127.0.0.1:8000/admin/';

  constructor(
    private _action$: Actions,
    private http: HttpClient,
    private userService: UserService
  ) { }

  @Effect()
  getData = this._action$.pipe(
    ofType(UserActions.GET_DATA),
    switchMap(() =>
      this.http.post(this.SERVER_URL + 'userList', { 'code': 'abc123' }).pipe(
        map((data: any) => {
          this.userService.isLoading$.next(false);
          return new UserActions.FetchData(data.dataList);
        }),
        catchError(error => {
          console.error(error);
          return of();
        })
      )
    )
  );
}