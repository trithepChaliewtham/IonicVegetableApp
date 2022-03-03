import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbservicePage } from './dbservice.page';

const routes: Routes = [
  {
    path: '',
    component: DbservicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DbservicePageRoutingModule {}
