import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  MainComponent,
  DashboardComponent,
} from './components';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', component: DashboardComponent },
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
