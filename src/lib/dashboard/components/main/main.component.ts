import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from '../../store/dashboard.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  navitem = [
    { title: 'Dashboard', link: '/dashboard/home' },
    { title: 'Users', link: '/dashboard/user' }
  ];

  constructor(
    public dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  direct(link: string) {
    this.dashboardService.toggleMenu();
    this.router.navigate([link]);
  }

}
