import { Selector } from '../../type/selector';
import { IAppState } from '../../type/app-state';
import { DeviceState } from './device.model';
import { map, distinctUntilChanged } from 'rxjs/operators';

export function getDeviceList(): Selector<IAppState, DeviceState> {
  return state$ => state$.pipe(
    map(state => state.device.get('devices')),
    distinctUntilChanged()
  );
}