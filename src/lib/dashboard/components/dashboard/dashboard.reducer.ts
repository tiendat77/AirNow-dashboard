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

    case DashboardActions.FETCH_AIR: {

      const aqiList = [];
      const temperatureList = [];
      const humidityList = [];

      console.log('redux ', action.payload.aqi);

      for (let i = 0; i < action.payload.aqi.length; i++) {
        // Fetch aqi
        const aqi = action.payload.aqi[i];
        aqiList.push({
          y: aqi.aqi,
          x: new Date(aqi.time)
        });

        // Fetch temperature
        const temperature = action.payload.temperature[i];
        temperatureList.push({
          y: temperature.degrees,
          x: new Date(temperature.time)
        });

        // Fetch humidity
        const humidity = action.payload.humidity[i];
        humidityList.push({
          y: humidity.humidity,
          x: new Date(humidity.time)
        })
      }

      return state
        .set('aqi', aqiList)
        .set('temperature', temperatureList)
        .set('humidity', humidityList);
    }

    case DashboardActions.FETCH_LOCATION: {
      const locations = action.payload;
      return state.set('locations', locations);
    }

    default:
      return state;
  }
}