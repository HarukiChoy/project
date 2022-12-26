import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripProfilePageRoutingModule } from './trip-profile-routing.module';

import { TripProfilePage } from './trip-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripProfilePageRoutingModule,
    MaterialModule,
  ],
  declarations: [TripProfilePage],
})
export class TripProfilePageModule {}
