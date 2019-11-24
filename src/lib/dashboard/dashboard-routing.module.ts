import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  MainComponent,
  DashboardComponent,
} from './components';
import { UserComponent } from './components/user/user.component';
import { DeviceComponent } from './components/device/device.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
          { path: 'home', component: DashboardComponent },
          { path: 'home/:range', component: DashboardComponent },
          { path: 'home/:location', component: DashboardComponent },
          { path: 'home/:range/:location', component: DashboardComponent },
          { path: 'user', component: UserComponent },
          { path: 'user/:id', component: UserComponent },
          { path: 'device', component: DeviceComponent },
          { path: 'device/:id', component: DeviceComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
