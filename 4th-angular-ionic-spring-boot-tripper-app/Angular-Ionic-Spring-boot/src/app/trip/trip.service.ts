import { TripWithId, PrepareList } from './../model/interface';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Trip } from '../model/interface';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  trips: TripWithId[] = [];
  airports: object[] = [];
  prepareList: PrepareList[] = [
    { id: 1, content: 'Buy Umbrella', isDone: false },
    { id: 2, content: 'Buy SIM card', isDone: false },
  ];
  doneList: PrepareList[] = [
    { id: 3, content: 'Buy air flight ticket', isDone: true },
  ];

  constructor(private api: ApiService) {}

  async getTripList() {
    try {
      this.trips = await this.api.get('/trip/list');
    } catch (error) {
      alert(String(error));
      return;
    }
  }

  async getAirportList() {
    try {
      this.airports = await this.api.get('/trip/airportList');
    } catch (error) {
      alert(String(error));
      return;
    }
  }

  async getTripProfile(id: number) {
    try {
      let result = await this.api.get('/trip/profile/' + id);
      return result;
    } catch (error) {
      alert(String(error));
      return;
    }
  }

  async addTrip(trip: Trip) {
    if (!trip.fromDate) {
      return { error: 'Missing going to date.' };
    }
    if (!trip.departureIATA) {
      return { error: 'Missing departure airport data.' };
    }
    if (!trip.toDate) {
      return { error: 'Missing coming back date.' };
    }
    if (!trip.arrivalIATA) {
      return { error: 'Missing arrival airport data.' };
    }
    if (!trip.departureFlight) {
      return { error: 'Missing going to flight name.' };
    }
    if (!trip.fromDepartureTime) {
      return { error: 'Missing going to departure time.' };
    }
    if (!trip.fromArrivalTime) {
      return { error: 'Missing going to arrival time.' };
    }
    if (!trip.arrivalFlight) {
      return { error: 'Missing coming back flight name.' };
    }
    if (!trip.toDepartureTime) {
      return { error: 'Missing coming back departure time.' };
    }
    if (!trip.toArrivalTime) {
      return { error: 'Missing coming back arrival time.' };
    }
    let result = await this.api.post('/trip/new', trip);
    let id: number = result.id;
    this.trips.push({ id: id, ...trip });
    console.log(this.trips);

    return result;
  }

  async updateTrip(trip: TripWithId) {
    if (!trip.fromDate) {
      return { error: 'Missing going to date.' };
    }
    if (!trip.departureIATA) {
      return { error: 'Missing departure airport data.' };
    }
    if (!trip.toDate) {
      return { error: 'Missing coming back date.' };
    }
    if (!trip.arrivalIATA) {
      return { error: 'Missing arrival airport data.' };
    }
    if (!trip.departureFlight) {
      return { error: 'Missing going to flight name.' };
    }
    if (!trip.fromDepartureTime) {
      return { error: 'Missing going to departure time.' };
    }
    if (!trip.fromArrivalTime) {
      return { error: 'Missing going to arrival time.' };
    }
    if (!trip.arrivalFlight) {
      return { error: 'Missing coming back flight name.' };
    }
    if (!trip.toDepartureTime) {
      return { error: 'Missing coming back departure time.' };
    }
    if (!trip.toArrivalTime) {
      return { error: 'Missing coming back arrival time.' };
    }
    let result = await this.api.put(`/trip/update`, trip);
    return result;
  }

  async addToPrepareList(content: string) {
    return await this.api.post('/prepare/item', { content });
  }

  async updatePrepareList() {}
}
