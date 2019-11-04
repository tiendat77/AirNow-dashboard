import { StatisticsModel, ForecastModel, AirModel } from './dashboard.model';

export interface DashboardState {
  statistics: StatisticsModel[];
  forecast: ForecastModel[];
  aqi: AirModel[];
  temperature: AirModel[];
  humidity: AirModel[];
  locations: string[];
}
