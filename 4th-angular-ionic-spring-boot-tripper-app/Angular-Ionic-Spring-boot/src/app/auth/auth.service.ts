import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  constructor(private apiService: ApiService) {}
  async checkLogIn() {
    let token = this.apiService.token;

    if (token == null) {
      return this.isLoggedIn;
    }

    let result = await this.apiService.get('/auth/check');
    if (!result.userId) {
      return this.isLoggedIn;
    }
    this.isLoggedIn = true;
    return this.isLoggedIn;
  }
}
