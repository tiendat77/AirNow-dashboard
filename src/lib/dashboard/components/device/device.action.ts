import { Action } from '@ngrx/store';

export const DEVICE_GET_DATA = '[DEVICE] Get Data';
export const DEVICE_FETCH_DATA = '[DEVICE] Fetch Data';
export const DEVICE_CREATE = '[DEVICE] Create Device';
export const DEVICE_UPDATE = '[DEVICE] Update Device';
export const DEVICE_REMOVE = '[DEVICE] Remove Device';

export class GetData implements Action {
  readonly type = DEVICE_GET_DATA;
}

export class FetchData implements Action {
  readonly type = DEVICE_FETCH_DATA;
  constructor(public payload: any) { }
}

export class CreateDevice implements Action {
  readonly type = DEVICE_CREATE;
  constructor(public payload: any) { }
}

export class UpdateDevice implements Action {
  readonly type = DEVICE_UPDATE;
  constructor(public payload: any) { }
}

export class RemoveDevice implements Action {
  readonly type = DEVICE_REMOVE;
  constructor(public payload: any) { }
}

export type ALL = GetData | FetchData | CreateDevice | UpdateDevice | RemoveDevice;