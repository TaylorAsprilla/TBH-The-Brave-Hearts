import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';

import {
  AgentFormInterface,
  AgentUpdateFormInterface,
  ChangePadswordInterface,
  LoadAllAgentInterface,
  LoadAllAgentsInterface,
} from 'src/app/core/interfaces/agent.interface';
import { LoginFormInterface } from 'src/app/core/interfaces/login-form.interface';
import { AgentModel } from 'src/app/core/models/agent.model';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class AgentService {
  public agent: AgentModel;

  constructor(private httpClient: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.agent.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  validateToken(): Observable<boolean> {
    return this.httpClient
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const {
            uid,
            agentCode,
            firstName,
            lastName,
            city,
            state,
            zip,
            email,
            dateBirth,
            img,
            role,
            active,
            createdAt,
          } = resp.agent;

          this.agent = new AgentModel(
            uid,
            agentCode,
            firstName,
            lastName,
            state,
            email,
            dateBirth,
            city,
            zip,
            '',
            role,
            img,
            active,
            createdAt
          );
          localStorage.setItem('token', resp.token);
          return true;
        }),

        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }

  login(login: LoginFormInterface) {
    return this.httpClient.post(`${base_url}/login`, login).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl(ROUTE_APP.AUTH_LOGIN);
  }

  getAllAgents() {
    return this.httpClient
      .get<LoadAllAgentsInterface>(`${base_url}/agents/all`, this.headers)
      .pipe(
        map((resp: LoadAllAgentsInterface) => {
          const agents = resp.agents.map(
            (agent) =>
              new AgentModel(
                agent.uid,
                agent.agentCode,
                agent.firstName,
                agent.lastName,
                agent.state,
                agent.email,
                agent.dateBirth,
                agent.city,
                agent.zip,
                '',
                agent.role,
                agent.img,
                agent.active,
                agent.createdAt
              )
          );
          return { ...resp, agents };
        }),
        catchError((error: any) => {
          console.log('An error occurred');
          console.warn(error);
          return throwError('Custom error');
        })
      );
  }

  getAgent(id: string) {
    return this.httpClient
      .get<LoadAllAgentInterface>(`${base_url}/agents/${id}`, this.headers)
      .pipe(map((resp: { ok: boolean; agent: AgentModel }) => resp.agent));
  }

  createAgent(agent: AgentFormInterface) {
    return this.httpClient.post(`${base_url}/agents`, agent, this.headers);
  }

  updateAgentProfile(agent: AgentUpdateFormInterface) {
    return this.httpClient.put(
      `${base_url}/agents/${this.uid}`,
      agent,
      this.headers
    );
  }

  updateAgent(agent: AgentModel) {
    return this.httpClient.put(
      `${base_url}/agents/${agent.uid}`,
      agent,
      this.headers
    );
  }

  deleteAgent(agent: AgentModel) {
    return this.httpClient.delete(
      `${base_url}/agents/${agent.uid}`,
      this.headers
    );
  }

  forgotPassword(agentCode: string) {
    return this.httpClient.put(`${base_url}/login/forgotpassword`, agentCode);
  }

  changePassword(changePassword: ChangePadswordInterface) {
    return this.httpClient.put(
      `${base_url}/login/changepassword`,
      changePassword,
      this.headers
    );
  }

  createNewPassword(newPassword: string, token: string) {
    return this.httpClient.put(
      `${base_url}/login/createPassword`,
      { newPassword: newPassword },
      {
        headers: {
          'x-reset': token,
        },
      }
    );
  }
}
