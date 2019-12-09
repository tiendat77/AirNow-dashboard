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
    name: 'Huynh Tien Dat',
    username: 'tiendat',
    email: 'huynhztienzdat@gmail.com'
  };

  constructor(
    public dashboardService: DashboardService,
    public loginService: LoginService
  ) { }

  ngOnInit() {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    if (userStorage) {
      this.user.name = userStorage.name;
      this.user.username = userStorage.username;
      this.user.email = userStorage.email;
    }
  }

  sidenavToggle() {
    this.dashboardService.toggleMenu();
  }

  logout() {
    this.loginService.logout();
  }

}
