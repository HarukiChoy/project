import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  navigatePageTo(navLink: string) {
    this.router.navigate([navLink]);
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isLoggedIn = await this.authService.checkLogIn();
    if (!isLoggedIn) {
      this.navigatePageTo('/tabs/login');
      return;
    }
    return true;
  }
}
