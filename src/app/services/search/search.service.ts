import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  fullSearch(value: string) {
    return this.httpClient.get<any>(
      `${base_url}/search/${value}`,
      this.headers
    );
  }
}
