export interface StatisticsModel {
  name: string;
  data: number;
}

export interface ForecastModel {
  location: string;
  temperature: number;
  humidity: number;
  aqi: number;
  status: string;
  pollutant: number;
}

export interface AirModel {
  location: string;
  value: number;
  time: number;
}
