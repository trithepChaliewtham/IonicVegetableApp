import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VegatablesPage } from './vegatables.page';

const routes: Routes = [
  {
    path: '',
    component: VegatablesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VegatablesPageRoutingModule {}
