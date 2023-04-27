import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AgentFormInterface } from 'src/app/core/interfaces/agent-form.interface';
import { LoginFormInterface } from 'src/app/core/interfaces/login-form.interface';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class AgentService {
  constructor(private httpClient: HttpClient) {}

  login(login: LoginFormInterface) {
    return this.httpClient.post(`${base_url}/login`, login).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  createAgent(agent: AgentFormInterface) {
    return this.httpClient.post(`${base_url}/agents`, agent);
  }
}
