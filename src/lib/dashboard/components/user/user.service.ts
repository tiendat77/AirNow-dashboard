import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { IAppState } from '../../type/app-state';
import { Observable, BehaviorSubject } from 'rxjs';

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
      console.log('userlist', data);
      this.users = data;
    });
  }

  getData() {
    this.isLoading$.next(true);
    this._store.dispatch(new UserActions.GetData());
  }


}