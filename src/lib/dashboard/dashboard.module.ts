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

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Service
import { DashboardService } from './components/dashboard/dashboard.service';
import { dashboardReducer } from './components/dashboard/dashboard.reducer';
import { DashboardEffect } from './components/dashboard/dashboard.effect';
import { UserService } from './components/user/user.service';
import { userReducer } from './components/user/user.reducer';
import { UserEffect } from './components/user/user.effect';
import { DeviceService } from './components/device/device.service';
import { deviceReducer } from './components/device/device.reducer';
import { DeviceEffect } from './components/device/device.effect';

// Components
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { ForecastComponent } from './components/dashboard/forecast/forecast.component';
import { AqiChartComponent } from './components/chart/aqi-chart/aqi-chart.component';
import { TempChartComponent } from './components/chart/temp-chart/temp-chart.component';
import { HumiChartComponent } from './components/chart/humi-chart/humi-chart.component';
import { UserComponent } from './components/user/user.component';
import { DeviceComponent } from './components/device/device.component';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    HeaderBarComponent,
    ForecastComponent,
    AqiChartComponent,
    TempChartComponent,
    HumiChartComponent,
    UserComponent,
    DeviceComponent
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
    NgxDatatableModule,
    StoreModule.forRoot({ 
      dashboard: dashboardReducer,
      user: userReducer,
      device: deviceReducer
    }),
    EffectsModule.forRoot([
      DashboardEffect,
      UserEffect,
      DeviceEffect
    ])
  ],
  providers: [
    DashboardService,
    UserService,
    DeviceService
  ],
})
export class DashboardModule { }
