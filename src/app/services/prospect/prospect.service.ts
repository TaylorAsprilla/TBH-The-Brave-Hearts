import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import {
  ILoadAllProspectInterface,
  ILoadAllProspectsInterface,
  ProspectFormInterface,
} from 'src/app/core/interfaces/prospect.interface';
import { ProspectModel } from 'src/app/core/models/prospect.model';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProspectService {
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

  getAllProspects() {
    return this.httpClient
      .get<ILoadAllProspectsInterface>(`${base_url}/prospects`, this.headers)
      .pipe(
        map(
          (prospect: { ok: boolean; prospects: ProspectModel[] }) =>
            prospect.prospects
        )
      );
  }

  getAllProspectsForAgents(idAgent: string) {
    return this.httpClient
      .get<ILoadAllProspectsInterface>(
        `${base_url}/prospects/all/${idAgent}`,
        this.headers
      )
      .pipe(
        map(
          (prospect: { ok: boolean; prospects: ProspectModel[] }) =>
            prospect.prospects
        )
      );
  }

  getProspect(id: string) {
    return this.httpClient
      .get<ILoadAllProspectInterface>(
        `${base_url}/prospects/${id}`,
        this.headers
      )
      .pipe(
        map((resp: { ok: boolean; prospect: ProspectModel }) => resp.prospect)
      );
  }

  createprospect(prospect: ProspectFormInterface) {
    return this.httpClient.post(
      `${base_url}/prospects`,
      prospect,
      this.headers
    );
  }

  updateProspect(prospect: ProspectModel) {
    return this.httpClient.put(
      `${base_url}/prospects/${prospect.uid}`,
      prospect,
      this.headers
    );
  }

  deleteProspect(prospect: ProspectModel) {
    return this.httpClient.delete(
      `${base_url}/prospects/${prospect.uid}`,
      this.headers
    );
  }
}
