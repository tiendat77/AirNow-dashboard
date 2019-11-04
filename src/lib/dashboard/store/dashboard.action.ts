import { Action } from '@ngrx/store';

export const GET_STATISTICS = '[Dashboard] Get Statistics';
export const GET_STATISTICS_SUCCESS = '[Dashboard] Get Statistics Success';
export const GET_FORECAST = '[Dashboard] Get Forecast';
export const GET_FORECAST_SUCCESS = '[Dashboard] Get Forecast Success';
export const GET_AQI = '[Dashboard] Get AQI';
export const GET_AQI_SUCCESS = '[Dashboard] Get AQI Success';
export const GET_TEMPERATURE = '[Dashboard] Get Temperature';
export const GET_TEMPERATURE_SUCCESS = '[Dashboard] Get Temperature Success';
export const GET_HUMIDITY = '[Dashboard] Get Humidity';
export const GET_HUMIDITY_SUCCESS = '[Dashboard] Get Humidity Success';
export const GET_LOCATION = '[Dashboard] Get Locations';
export const GET_LOCATION_SUCCESS = '[Dashboard] Get Locations Success';

export class GetStatistics implements Action {
  readonly type = GET_STATISTICS;
}

export class GetStatisticsSuccess implements Action {
  readonly type = GET_STATISTICS_SUCCESS;
  constructor(public payload: any) { }
}

export class GetForecast implements Action {
  readonly type = GET_FORECAST;
}

export class GetForecastSuccess implements Action {
  readonly type = GET_FORECAST_SUCCESS;
  constructor(public payload: any) { }
}

export class GetAQI implements Action {
  readonly type = GET_AQI;
  constructor(public payload: any) { }
}

export class GetAQISuccess implements Action {
  readonly type = GET_AQI_SUCCESS;
  constructor(public payload: any) { }
}

export class GetTemperature implements Action {
  readonly type = GET_TEMPERATURE;
}

export class GetTemperatureSuccess implements Action {
  readonly type = GET_TEMPERATURE_SUCCESS;
  constructor(public payload: any) { }
}

export class GetHumidity implements Action {
  readonly type = GET_HUMIDITY;
}

export class GetHumiditySuccess implements Action {
  readonly type = GET_HUMIDITY_SUCCESS;
  constructor(public payload: any) { }
}

export class GetLocation implements Action {
  readonly type = GET_LOCATION;
}

export class GetLocationSuccess implements Action {
  readonly type = GET_LOCATION_SUCCESS;
  constructor(public payload: any) { }
}

export type All = GetStatistics | GetStatisticsSuccess |
                  GetForecast | GetForecastSuccess |
                  GetAQI | GetAQISuccess |
                  GetTemperature | GetTemperatureSuccess |
                  GetHumidity | GetHumiditySuccess |
                  GetLocation | GetLocationSuccess;
