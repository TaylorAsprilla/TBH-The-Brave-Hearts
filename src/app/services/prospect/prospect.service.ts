import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import {
  IProspectsResponse,
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

  // get uid(): string {
  //   return this.agent.uid || '';
  // }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  getProspects() {
    return this.httpClient
      .get<IProspectsResponse>(`${base_url}/prospects`, this.headers)
      .pipe(
        map(
          (prospect: { ok: boolean; prospects: ProspectModel[] }) =>
            prospect.prospects
        )
      );
  }

  createprospect(prospect: ProspectFormInterface) {
    return this.httpClient.post(
      `${base_url}/prospects`,
      prospect,
      this.headers
    );
  }

  // updateAgentProfile(agent: AgentUpdateFormInterface) {
  //   return this.httpClient.put(
  //     `${base_url}/agents/${this.uid}`,
  //     agent,
  //     this.headers
  //   );
  // }

  // updateAgent(agent: AgentModel) {
  //   return this.httpClient.put(
  //     `${base_url}/agents/${agent.uid}`,
  //     agent,
  //     this.headers
  //   );
  // }

  // deleteAgent(agent: AgentModel) {
  //   return this.httpClient.delete(
  //     `${base_url}/agents/${agent.uid}`,
  //     this.headers
  //   );
  // }

  // changePassword(changePassword: ChangePadswordInterface) {
  //   return this.httpClient.put(
  //     `${base_url}/login/changepassword`,
  //     changePassword,
  //     this.headers
  //   );
  // }
}
