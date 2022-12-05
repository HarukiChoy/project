import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  mobile: number;
  username: string = '';
  password: string = '';
  rePassword: string = '';
  passwordType: string = 'password';
  eye: string = 'eye-outline';

  constructor(private userService: UserService, private router: Router) {}

  navigatePageTo(navLink: string) {
    this.router.navigate([navLink]);
  }

  // change the eye icon in the form
  changePasswordEye() {
    if (this.eye == 'eye-off-outline') {
      this.eye = 'eye-outline';
      this.passwordType = 'password';
    } else {
      this.eye = 'eye-off-outline';
      this.passwordType = 'text';
    }
  }

  // invoked by clicking the register button in register page
  async register() {
    let res = await this.userService.register(
      this.username,
      this.password,
      this.rePassword,
      this.email,
      this.mobile
    );
    // let userId = res;
    // console.log('The user id returned is:', userId);
    this.navigatePageTo('');
  }
}
