import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { TripProfilePage } from './trip-profile.page';

const routes: Routes = [
  {
    path: '',
    component: TripProfilePage,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripProfilePageRoutingModule {}
