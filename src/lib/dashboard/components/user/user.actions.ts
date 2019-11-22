import { Action } from '@ngrx/store';

export const GET_DATA = '[User] Get Data';
export const FETCH_DATA = '[User] Fetch Data';
export const USER_CREATE = '[User] Create User';
export const USER_UPDATE = '[User] Update User';
export const USER_CHANGE_PASSWORD = '[User] Change Password';
export const USER_REMOVE = '[User] Remove User';

export class GetData implements Action {
  readonly type = GET_DATA;
}

export class FetchData implements Action {
  readonly type = FETCH_DATA;
  constructor(public payload: any) { }
}

export class CreateUser implements Action {
  readonly type = USER_CREATE;
  constructor(public payload: any) { }
}

export class UpdateUser implements Action {
  readonly type = USER_UPDATE;
  constructor(public payload: any) { }
}

export class ChangePassword implements Action {
  readonly type = USER_CHANGE_PASSWORD;
  constructor(public payload: any) { }
}

export class RemoveUser implements Action {
  readonly type = USER_REMOVE;
  constructor(public payload: any) { }
}

export type ALL = GetData | FetchData | CreateUser | UpdateUser | ChangePassword | RemoveUser;
