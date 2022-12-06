import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrepareEditPage } from './prepare-edit.page';

const routes: Routes = [
  {
    path: '',
    component: PrepareEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrepareEditPageRoutingModule {}
