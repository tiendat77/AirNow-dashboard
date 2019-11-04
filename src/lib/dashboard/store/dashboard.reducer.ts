import * as DashboardActions from './dashboard.action';
import { DashboardState } from './dashboard.state';

type DashboardActions = DashboardActions.All;

const initialState: DashboardState = {
  statistics: [],
  forecast: [],
  aqi: [],
  temperature: [],
  humidity: [],
  locations: []
};

export function dashboardReducer(state: DashboardState = initialState, action: DashboardActions.All) {

  switch (action.type) {

    case DashboardActions.GET_STATISTICS_SUCCESS: {
      const statistics = action.payload;
      return {
        ...state,
        statistics
      };
    }

    case DashboardActions.GET_FORECAST_SUCCESS: {
      const forecast = action.payload;
      return {
        ...state,
        forecast
      };
    }

    case DashboardActions.GET_AQI_SUCCESS: {
      const aqi = action.payload;
      return {
        ...state,
        aqi
      };
    }

    case DashboardActions.GET_TEMPERATURE_SUCCESS: {
      const temperature = action.payload;
      return {
        ...state,
        temperature
      };
    }

    case DashboardActions.GET_HUMIDITY_SUCCESS: {
      const humidity = action.payload;
      return {
        ...state,
        humidity
      };
    }

    case DashboardActions.GET_LOCATION_SUCCESS: {
      const locations = action.payload;
      return {
        ...state,
        locations
      };
    }

    default:
      return state;
  }
}
