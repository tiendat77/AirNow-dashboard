import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { IAppState } from '../../type/app-state';
import { getDeviceList } from './device.selector';

import * as DeviceActions from './device.action';

@Injectable()
export class DeviceService {

  devices$: Observable<any>;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private store: Store<IAppState>) {
    this.devices$ = this.store.pipe(getDeviceList());
  }

  getData() {
    this.isLoading$.next(true);
    this.store.dispatch(new DeviceActions.GetData());
  }

  createDevice(device: any) {
    this.isLoading$.next(true);
    this.store.dispatch(new DeviceActions.CreateDevice(device));
  }

  updateDevice(device: any) {
    this.isLoading$.next(true);
    this.store.dispatch(new DeviceActions.UpdateDevice(device));
  }

  removeDevice(device: any) {
    this.isLoading$.next(true);
    this.store.dispatch(new DeviceActions.RemoveDevice(device));
  }

}