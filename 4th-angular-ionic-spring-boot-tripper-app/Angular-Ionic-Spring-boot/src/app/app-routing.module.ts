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
  // {
  //   path: 'login',
  //   loadChildren: () =>
  //     import('./login/login.module').then((m) => m.LoginPageModule),
  // },
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
