import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: '../lib/login/login.module#LoginModule'
  },
  {
    path: 'dashboard',
    loadChildren: '../lib/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: '**',
    loadChildren: '../lib/login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
