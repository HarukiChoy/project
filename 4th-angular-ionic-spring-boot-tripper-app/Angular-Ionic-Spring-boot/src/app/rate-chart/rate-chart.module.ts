import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateChartPageRoutingModule } from './rate-chart-routing.module';

import { RateChartPage } from './rate-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateChartPageRoutingModule
  ],
  declarations: [RateChartPage]
})
export class RateChartPageModule {}
