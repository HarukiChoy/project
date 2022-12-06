import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class Tab3Service {
  buyResult: string[] = [];
  sellResult: string[] = [];
  date: string[] = [];

  constructor(public api: ApiService, private router: Router) {}

  navigatePageTo(navLink: string) {
    this.router.navigate([navLink]);
  }

  async getRate() {
    return await this.api.get('/rate/list');
  }

  async getRateData(eng: string) {
    let result = await this.api.get('/rate/data/' + eng);
    this.buyResult = result.map((record) => record.buy);
    this.sellResult = result.map((record) => record.sell);
    this.date = result.map((record) => record.scrappedTimestamp.split('T')[0]);
    this.navigatePageTo('rate-chart');
    return result;
  }
}
