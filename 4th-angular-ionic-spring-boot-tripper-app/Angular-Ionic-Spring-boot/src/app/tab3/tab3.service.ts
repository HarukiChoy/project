import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class Tab3Service {
  constructor(public api: ApiService) {}

  async getRate() {
    return await this.api.get('/rate/list');
  }
}
