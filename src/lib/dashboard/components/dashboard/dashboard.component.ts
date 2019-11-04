import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import * as MOCK from '../mock/mock';
import { DashboardService } from '../../store/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(
    public dashboardService: DashboardService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dashboardService.getData();
  }

}
