import { TripWithId, PrepareList } from './../model/interface';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Trip } from '../model/interface';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  trips: Array<TripWithId> = [];
  airports: object[] = [];
  prepareList: Array<PrepareList> = [
    // { id: 1, content: 'Buy Umbrella', isDone: false },
  ];
  doneList: PrepareList[] = [];

  constructor(private api: ApiService) {}

  // airport list GET
  async getAirportList() {
    try {
      this.airports = await this.api.get('/trip/airportList');
    } catch (error) {
      alert(String(error));
      return;
    }
  }

  // trip profile GET
  async getTripProfile(id: number) {
    try {
      let result = await this.api.get('/trip/profile/' + id);
      return result;
    } catch (error) {
      alert(String(error));
      return;
    }
  }

  // trip GET
  async getTripList() {
    try {
      this.trips = await this.api.get('/trip/list');
    } catch (error) {
      alert(String(error));
      return;
    }
  }

  // trip POST
  async addTrip(trip: Trip) {
    if (!trip.fromDate) {
      return { error: 'Missing going to date.' };
    }
    if (!trip.departureIATA) {
      return { error: 'Missing departure airport data.' };
    }
    if (trip.departureIATA.length !== 3) {
      return {
        error: 'Wrong format Airport code, should be 3 characters IATA code.',
      };
    }
    if (!trip.toDate) {
      return { error: 'Missing coming back date.' };
    }
    if (!trip.arrivalIATA) {
      return { error: 'Missing arrival airport data.' };
    }
    if (trip.arrivalIATA.length !== 3) {
      return {
        error: 'Wrong format Airport code, should be 3 characters IATA code.',
      };
    }
    if (!trip.departureFlight) {
      return { error: 'Missing going to flight name.' };
    }
    if (trip.departureFlight.length > 10) {
      return {
        error:
          'Wrong format Air Flight Name, should be smaller than 10 characters.',
      };
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
    if (trip.arrivalFlight.length > 10) {
      return {
        error:
          'Wrong format Air Flight Name, should be smaller than 10 characters.',
      };
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

    return result;
  }

  // trip PUT
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

  // prepare list POST
  async addToPrepareList({ tripId, content }) {
    let result = await this.api.post('/prepare/item', { tripId, content });
    if (result.error) {
      alert('Failed to add a new item.');
      return;
    }
    this.prepareList = result.filter((record) => record.done == false);
    this.doneList = result.filter((record) => record.done == true);
    return;
  }

  // prepare list GET
  async getList(tripId: number) {
    let result = await this.api.get('/prepare/list/' + tripId);
    this.prepareList = result.filter((record) => record.done == false);
    this.doneList = result.filter((record) => record.done == true);
    return;
  }

  // prepare list PUT
  async changeToDone(prepare: PrepareList) {
    let result = await this.api.put('/prepare/update', prepare);
    this.prepareList = result.filter((record) => record.done == false);
    this.doneList = result.filter((record) => record.done == true);
    console.log('updated result: ', result);
  }

  // schedule POST
  async addToSchedule({ tripId, date, time, location }) {
    if (!tripId || !date || !time || !location) {
      return { error: 'Missing value.' };
    }
    return this.api.post('/schedule/item', {
      tripId,
      date,
      time,
      location,
    });
  }
}
