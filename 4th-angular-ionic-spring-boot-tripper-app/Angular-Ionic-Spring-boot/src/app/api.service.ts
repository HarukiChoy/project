import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  origin = 'http://localhost:8080';
  token: string;
  constructor() {
    this.token = localStorage.getItem('jwtToken');
  }

  async fetch(url: string, init?: RequestInit) {
    try {
      let res = await fetch(this.origin + url, init);
      let json = await res.json();

      if (json.jwtToken) {
        localStorage.setItem('jwtToken', json.jwtToken);
        this.token = json.jwtToken;
      }
      return json;
    } catch (error) {
      return { error: 'Failed to ' + (init?.method || 'fetch') + ' ' + url };
    }
  }

  async post(url: string, body: object) {
    return this.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
      body: JSON.stringify(body),
    });
  }

  async put(url: string, body: object) {
    return this.fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
      body: JSON.stringify(body),
    });
  }

  async get(url: string) {
    return this.fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
  }

  async upload(url: string, formData: FormData) {
    return this.fetch(url, { method: 'post', body: formData });
  }

  // async get(url: string, params: Record<string, string | number>) {
  //   return this.fetch(
  //     url + '?' + new URLSearchParams(params as Record<string, string>)
  //   );
  // }
}
