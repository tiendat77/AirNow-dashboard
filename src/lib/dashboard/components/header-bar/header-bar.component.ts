import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/lib/login/login/login.service';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  user = {
    avatar: 'admin.jpg',
    name: 'Huynh Tien Dat',
    email: 'huynhztienzdat@gmail.com'
  };

  constructor(
    public dashboardService: DashboardService,
    public loginService: LoginService
  ) { }

  ngOnInit() {
  }

  sidenavToggle() {
    this.dashboardService.toggleMenu();
  }

  logout() {
    this.loginService.logout();
  }

}
