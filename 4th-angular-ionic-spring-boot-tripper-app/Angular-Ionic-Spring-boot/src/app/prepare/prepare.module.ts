import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreparePageRoutingModule } from './prepare-routing.module';

import { PreparePage } from './prepare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreparePageRoutingModule
  ],
  declarations: [PreparePage]
})
export class PreparePageModule {}
