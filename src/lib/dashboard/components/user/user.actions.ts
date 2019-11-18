import { Action } from '@ngrx/store';

export const GET_DATA = '[User] Get Data';
export const FETCH_DATA = '[User] Fetch Data';

export class GetData implements Action {
  readonly type = GET_DATA;
}

export class FetchData implements Action {
  readonly type = FETCH_DATA;
  constructor(public payload: any) { }
}

export type ALL = GetData | FetchData;
