import { UserService } from './../user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  passwordType: string = 'password';
  eye: string = 'eye-outline';
  constructor(private userService: UserService) {}

  changeEye() {
    if (this.eye == 'eye-off-outline') {
      this.eye = 'eye-outline';
      this.passwordType = 'password';
    } else {
      this.eye = 'eye-off-outline';
      this.passwordType = 'text';
    }
  }

  async login() {
    await this.userService.login({
      email: this.email,
      password: this.password,
    });
  }
}
