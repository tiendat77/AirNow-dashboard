// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatIconModule,
  MatMenuModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatOptionModule,
  MatSelectModule,
  MatSnackBarModule,
  MatCardModule,
  MatTooltipModule,
  MatDialogModule,
  MatTabsModule,
  MatProgressBarModule

} from '@angular/material';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Service
import { DashboardService } from './store/dashboard.service';
import { dashboardReducer } from './store/dashboard.reducer';
import { DashboardEffect } from './store/dashboard.effect';

// Components
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { ForecastComponent } from './components/dashboard/forecast/forecast.component';
import { D3ChartComponent } from './components/chart/d3-chart/d3-chart.component';
import { AqiChartComponent } from './components/chart/aqi-chart/aqi-chart.component';
import { TempChartComponent } from './components/chart/temp-chart/temp-chart.component';
import { HumiChartComponent } from './components/chart/humi-chart/humi-chart.component';


@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    HeaderBarComponent,
    ForecastComponent,
    D3ChartComponent,
    AqiChartComponent,
    TempChartComponent,
    HumiChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,

    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressBarModule,

    NgxChartsModule,
    StoreModule.forRoot({ dashboard: dashboardReducer }),
    EffectsModule.forRoot([DashboardEffect])
  ],
  providers: [
    DashboardService
  ],
})
export class DashboardModule { }
