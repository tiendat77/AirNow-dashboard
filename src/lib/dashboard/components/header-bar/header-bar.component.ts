import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoginService } from 'src/lib/login/login/login.service';

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
    public dataService: DataService,
    public loginService: LoginService
  ) { }

  ngOnInit() {
  }

  sidenavToggle() {
    this.dataService.toggleMenu();
  }

  logout() {
    this.loginService.logout();
  }

}
