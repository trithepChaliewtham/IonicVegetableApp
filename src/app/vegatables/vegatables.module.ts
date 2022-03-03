import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VegatablesPageRoutingModule } from './vegatables-routing.module';

import { VegatablesPage } from './vegatables.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VegatablesPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [VegatablesPage]
})
export class VegatablesPageModule {}
