import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';

import { IAppState } from '../../type/app-state';
import { getUserList } from './user.selector';
import * as UserActions from './user.actions';

@Injectable()
export class UserService {

  users$: Observable<any>;
  users: any[] = [];

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private _store: Store<IAppState>) {
    this.users$ = this._store.pipe(getUserList());

    this.users$.subscribe(data => {
      this.users = data;
    });
  }

  getData() {
    this.isLoading$.next(true);
    this._store.dispatch(new UserActions.GetData());
  }

  createUser(user: any) {
    this.isLoading$.next(true);
    this._store.dispatch(new UserActions.CreateUser(user));
  }

  updateUser(user: any) {
    this.isLoading$.next(true);
    this._store.dispatch(new UserActions.UpdateUser(user));
  }

  changePassword(user: any) {
    this.isLoading$.next(true);
    this._store.dispatch(new UserActions.ChangePassword(user));
  }

  removeUser(user: any) {
    this.isLoading$.next(true);
    this._store.dispatch(new UserActions.RemoveUser(user));
  }
}