import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatCardModule,
  MatMenuModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTabsModule,
} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { ChartComponent } from './components/chart/chart.component';
import { DataService } from './services/data.service';
import { ForecastComponent } from './components/dashboard/forecast/forecast.component';


@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    HeaderBarComponent,
    ChartComponent,
    ForecastComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,

    NgxChartsModule,
    StoreModule
  ],
  providers: [
    DataService
  ],
})
export class DashboardModule { }
