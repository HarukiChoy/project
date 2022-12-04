import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../trip/trip.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  constructor(private router: Router, private tripService: TripService) {}

  navigatePageTo(navLink: string, id?: number) {
    this.router.navigate([navLink, id]);
  }

  ngOnInit() {
    this.tripService.getTripList();
  }

  addTrip() {
    this.router.navigate(['new-trip']);
  }

  get trips() {
    return this.tripService.trips;
  }

  async getTripProfile(id: number) {
    this.navigatePageTo('/trip-profile', id);
  }
}
