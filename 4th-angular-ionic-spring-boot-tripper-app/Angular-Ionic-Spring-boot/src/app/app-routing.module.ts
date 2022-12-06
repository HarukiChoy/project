import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'new-trip',
    loadChildren: () =>
      import('./trip/trip.module').then((m) => m.TripPageModule),
  },
  {
    path: 'trip-profile/:id',
    loadChildren: () =>
      import('./trip-profile/trip-profile.module').then(
        (m) => m.TripProfilePageModule
      ),
  },
  {
    path: 'prepare/:id',
    loadChildren: () =>
      import('./prepare/prepare.module').then((m) => m.PreparePageModule),
  },
  {
    path: 'schedule/:id',
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.SchedulePageModule),
  },
  {
    path: 'rate-chart',
    loadChildren: () =>
      import('./rate-chart/rate-chart.module').then(
        (m) => m.RateChartPageModule
      ),
  },

  // {
  //   path: 'tabs/home',
  //   loadChildren: () =>
  //     import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
