import { map } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IStatesResponse, StateModel } from 'src/app/core/models/state.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class StateService {
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

  getSates() {
    return this.httpClient
      .get<IStatesResponse>(`${base_url}/states`, this.headers)
      .pipe(
        map((state: { ok: boolean; states: StateModel[] }) => state.states)
      );
  }
}
