import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrepareEditPageRoutingModule } from './prepare-edit-routing.module';

import { PrepareEditPage } from './prepare-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrepareEditPageRoutingModule
  ],
  declarations: [PrepareEditPage]
})
export class PrepareEditPageModule {}
