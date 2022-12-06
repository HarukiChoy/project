import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  email: string;
  username: string;
  mobile: string;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    let result = await this.userService.getProfile();
    this.email = result.email;
    this.username = result.username;
    this.mobile = result.mobile;
  }
}
