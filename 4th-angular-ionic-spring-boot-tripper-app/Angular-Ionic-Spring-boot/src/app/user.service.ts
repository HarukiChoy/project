import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string;
  constructor(public api: ApiService, private router: Router) {}

  navigatePageTo(navLink: string) {
    this.router.navigate([navLink]);
  }

  async login({ email, password }) {
    let result = await this.api.post('/users/login', { email, password });
    if (result.error) {
      alert(String(result.error));
      return;
    }
    this.navigatePageTo('');
  }

  async register(
    username: string,
    password: string,
    rePassword: string,
    email: string,
    mobile: number
  ) {
    if (!username) {
      return { error: 'Missing username.' };
    }
    if (!password) {
      return { error: 'Missing password.' };
    }
    if (!rePassword) {
      return { error: 'Missing confirmed password.' };
    }
    if (!email) {
      return { error: 'Missing email.' };
    }
    if (!mobile) {
      return { error: 'Missing mobile.' };
    }
    if (typeof mobile !== 'number') {
      return { error: 'Invalid number format. It should be a number.' };
    }
    if (password !== rePassword) {
      return { error: 'Two password does not match.' };
    }
    let result = await this.api.post('/users/register', {
      username,
      password,
      email,
      mobile,
    });
    if (result.error) {
      alert(String(result.error));
      return;
    }
    this.navigatePageTo('');
  }
}
