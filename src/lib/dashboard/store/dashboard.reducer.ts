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
      // console.log('forecast', action.payload);
      const data = action.payload;
      const forecast = [];

      for (let i = 0; i < 3; i++) { // Maximum 3 forecast
        const dataObj = data[i];
        dataObj['temperature'] = Math.round(data[i].temperature);
        dataObj['humidity'] = Math.round(data[i].humidity);
        dataObj['pollutant'] = Math.round(data[i].pollutant * 10) / 10;
        forecast.push(dataObj);
      }

      return {
        ...state,
        forecast
      };
    }

    case DashboardActions.GET_AQI_SUCCESS: {
      const data = action.payload;
      const aqiList = [];
      for (const aqi of data) {
        const item = {};
        item['y'] = aqi.aqi;
        item['x'] = new Date(aqi.time);
        aqiList.push(item);
      }
      console.log('aqi ->', aqiList);

      return {
        ...state,
        aqi: aqiList
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
