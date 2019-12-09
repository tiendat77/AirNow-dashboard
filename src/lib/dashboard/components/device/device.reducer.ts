import { Map } from 'immutable';

import * as DeviceActions from './device.action';
import { DeviceState } from './device.model';

export type DeviceActions = DeviceActions.ALL;

const initialState = Map({
  devices: []
});

export function deviceReducer(state: DeviceState = initialState, action: DeviceActions.ALL) {
  switch(action.type) {
    case DeviceActions.DEVICE_FETCH_DATA: {
      return state.set('devices', action.payload);
    }

    default:
      return state;
  }
}