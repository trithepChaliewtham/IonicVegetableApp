import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DbservicePageRoutingModule } from './dbservice-routing.module';

import { DbservicePage } from './dbservice.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DbservicePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [DbservicePage]
})
export class DbservicePageModule {}
