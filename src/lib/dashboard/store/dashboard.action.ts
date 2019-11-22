import { Action } from '@ngrx/store';

export const GET_STATISTICS = '[Dashboard] Get Statistics';
export const FETCH_STATISTICS = '[Dashboard] Fetch Statistics';
export const GET_FORECAST = '[Dashboard] Get Forecast';
export const FETCH_FORECAST = '[Dashboard] Fetch Forecast';
export const GET_AIR = '[Dashboard] Get Air';
export const FETCH_AIR = '[Dashboard] Fetch Air';
export const GET_AQI = '[Dashboard] Get AQI';
export const FETCH_AQI = '[Dashboard] Fetch AQI';
export const GET_TEMPERATURE = '[Dashboard] Get Temperature';
export const FETCH_TEMPERATURE = '[Dashboard] Fetch Temperature';
export const GET_HUMIDITY = '[Dashboard] Get Humidity';
export const FETCH_HUMIDITY = '[Dashboard] Fetch Humidity';
export const GET_LOCATION = '[Dashboard] Get Locations';
export const FETCH_LOCATION = '[Dashboard] Fetch Locations';

export class GetStatistics implements Action {
  readonly type = GET_STATISTICS;
}

export class FetchStatistic implements Action {
  readonly type = FETCH_STATISTICS;
  constructor(public payload: any) { }
}

export class GetForecast implements Action {
  readonly type = GET_FORECAST;
}

export class FetchForecast implements Action {
  readonly type = FETCH_FORECAST;
  constructor(public payload: any) { }
}

export class GetAir implements Action {
  readonly type = GET_AIR;
  constructor(public payload: any) { }
}

export class FetchAir implements Action {
  readonly type = FETCH_AIR;
  constructor(public payload: any) { }
}


export class GetLocation implements Action {
  readonly type = GET_LOCATION;
}

export class FetchLocation implements Action {
  readonly type = FETCH_LOCATION;
  constructor(public payload: any) { }
}

export type All = GetStatistics | FetchStatistic |
                  GetForecast | FetchForecast |
                  GetAir | FetchAir |
                  GetLocation | FetchLocation;
