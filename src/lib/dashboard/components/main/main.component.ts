import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../store/dashboard.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  navitem = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Users', link: '/dashboard/user' }
  ];

  constructor(
    public dashboardService: DashboardService
  ) { }

  ngOnInit() {
  }

}
