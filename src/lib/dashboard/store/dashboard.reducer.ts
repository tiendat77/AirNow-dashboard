import { Map } from 'immutable';

import * as DashboardActions from './dashboard.action';
import { DashboardState } from './dashboard.state';

type DashboardActions = DashboardActions.All;

const initialState: DashboardState = Map({
  statistics: [],
  forecast: [],
  aqi: [],
  temperature: [],
  humidity: [],
  locations: []
});

export function dashboardReducer(state: DashboardState = initialState, action: DashboardActions.All) {

  switch (action.type) {

    case DashboardActions.FETCH_STATISTICS: {
      const statistics = action.payload;
      return state.set('statistics', statistics);
    }

    case DashboardActions.FETCH_FORECAST: {
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

      return state.set('forecast', forecast);
    }

    case DashboardActions.FETCH_AQI: {
      const data = action.payload;
      const aqiList = [];
      for (const aqi of data) {
        const item = {};
        item['y'] = aqi.aqi;
        item['x'] = new Date(aqi.time);
        aqiList.push(item);
      }

      return state.set('aqi', aqiList);
    }

    case DashboardActions.FETCH_TEMPERATURE: {
      const data = action.payload;
      const temperature = [];
      for (const temp of data) {
        const item = {};
        item['x'] = new Date(temp.time);
        item['y'] = temp.degrees;
        temperature.push(item);
      }

      return state.set('temperature', temperature);
    }

    case DashboardActions.FETCH_HUMIDITY: {
      const data = action.payload;
      const humidity = [];
      for (const humi of data) {
        const item = {};
        item['x'] = new Date(humi.time);
        item['y'] = humi.humidity;
        humidity.push(item);
      }

      return state.set('humidity', humidity);
    }

    case DashboardActions.FETCH_LOCATION: {
      const locations = action.payload;
      return state.set('locations', locations);
    }

    default:
      return state;
  }
}
