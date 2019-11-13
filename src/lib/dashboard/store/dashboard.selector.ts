import { Selector } from '../type/selector';
import { IAppState } from '../type/app-state';
import { DashboardState } from './dashboard.state';

import { map, distinctUntilChanged } from 'rxjs/operators';

export function getStatistics(): Selector<IAppState, DashboardState> {
  return state$ => state$.pipe(
    map(state => state.dashboard.get('statistics')),
    distinctUntilChanged()
  );
}

export function getForecast(): Selector<IAppState, DashboardState> {
  return state$ => state$.pipe(
    map(state => state.dashboard.get('forecast')),
    distinctUntilChanged()
  );
}

export function getAqi(): Selector<IAppState, DashboardState> {
  return state$ => state$.pipe(
    map(state => state.dashboard.get('aqi')),
    distinctUntilChanged()
  );
}

export function getTemperature(): Selector<IAppState, DashboardState> {
  return state$ => state$.pipe(
    map(state => state.dashboard.get('temperature')),
    distinctUntilChanged()
  );
}

export function getHumidity(): Selector<IAppState, DashboardState> {
  return state$ => state$.pipe(
    map(state => state.dashboard.get('humidity')),
    distinctUntilChanged()
  );
}

export function getLocations(): Selector<IAppState, DashboardState> {
  return state$ => state$.pipe(
    map(state => state.dashboard.get('locations')),
    distinctUntilChanged()
  );
}

