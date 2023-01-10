import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Airport } from '../model/interface';
import { TripService } from './trip.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  airportList: Airport[] = [];
  // fromDate: string = '';
  // departureIATA: string = '';
  // toDate: string = '';
  // arrivalIATA: string = '';
  // departureFlight: string = '';
  // fromDepartureTime: string = '';
  // fromArrivalTime: string = '';
  // arrivalFlight: string = '';
  // toDepartureTime: string = '';
  // toArrivalTime: string = '';

  fromDate: string = '2022-12-13';
  departureIATA: string = 'HKG';
  toDate: string = '2022-12-20';
  arrivalIATA: string = 'OKA';
  departureFlight: string = 'UO 820';
  fromDepartureTime: string = '07:35';
  fromArrivalTime: string = '11:05';
  arrivalFlight: string = 'UO 821';
  toDepartureTime: string = '12:00';
  toArrivalTime: string = '13:55';

  constructor(private tripService: TripService, private router: Router) {}

  ngOnInit() {
    this.tripService.getAirportList();
  }

  navigatePageTo(navLink: string) {
    this.router.navigate([navLink]);
  }

  async addTrip() {
    let result = await this.tripService.addTrip({
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
    this.navigatePageTo('tabs/trip');
  }

  get airports() {
    return this.tripService.airports;
  }


  // search() {
  //   if (this.departureIATA === '') {
  //     this.airportList = this.tripService.airports;
  //   } else {
  //     this.airportList = this.tripService.airports;
  //     this.airportList = this.airportList.filter((res) => {
  //       return res.iata_code
  //         .toLocaleLowerCase()
  //         .match(this.departureIATA.toLocaleLowerCase());
  //     });
  //     console.log(this.airportList);
  //   }
  // }
}
