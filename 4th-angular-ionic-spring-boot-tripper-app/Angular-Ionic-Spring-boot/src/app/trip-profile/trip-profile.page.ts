import { TripWithId } from './../model/interface';
// import { DEV_MODE } from './../api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TripService } from '../trip/trip.service';

@Component({
  selector: 'app-trip-profile',
  templateUrl: './trip-profile.page.html',
  styleUrls: ['./trip-profile.page.scss'],
})
export class TripProfilePage implements OnInit, OnDestroy {
  isDisabled = true;

  // trip$ = this.activatedRoute.params.pipe(
  //   mergeMap((params) => this.tripService.getTripDetail(params.id))
  // );
  constructor(
    private tripService: TripService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  navigatePageTo(navLink: string, id?: number) {
    this.router.navigate([navLink, id]);
  }

  fromDate: string;
  departureIATA: string;
  toDate: string;
  arrivalIATA: string;
  departureFlight: string;
  fromDepartureTime: string;
  fromArrivalTime: string;
  arrivalFlight: string;
  toDepartureTime: string;
  toArrivalTime: string;

  sub?: Subscription;
  id: number;
  async ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
    });

    let result = await this.tripService.getTripProfile(this.id);
    this.fromDate = result.fromDate;
    this.departureIATA = result.departureIATA;
    this.toDate = result.toDate;
    this.arrivalIATA = result.arrivalIATA;
    this.departureFlight = result.departureFlight;
    this.fromDepartureTime = result.fromDepartureTime;
    this.fromArrivalTime = result.fromArrivalTime;
    this.arrivalFlight = result.arrivalFlight;
    this.toDepartureTime = result.toDepartureTime;
    this.toArrivalTime = result.toArrivalTime;
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  edit() {
    if (this.isDisabled === false) {
      this.isDisabled = true;
      return;
    }
    this.isDisabled = false;
  }

  async updateTrip() {
    let result = await this.tripService.updateTrip({
      id: this.id,
      fromDate: this.fromDate,
      departureIATA: this.departureIATA,
      toDate: this.toDate,
      arrivalIATA: this.arrivalIATA,
      departureFlight: this.departureFlight,
      fromDepartureTime: this.fromDepartureTime,
      fromArrivalTime: this.fromArrivalTime,
      arrivalFlight: this.arrivalFlight,
      toDepartureTime: this.toDepartureTime,
      toArrivalTime: this.toArrivalTime,
    });
    if (result.error) {
      alert(String(result.error));
      return;
    }
    await this.tripService.getTripList();
    this.router.navigate(['/tabs/trip']);
  }
}
