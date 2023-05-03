import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { AgentFormInterface } from 'src/app/core/interfaces/agent-form.interface';
import { LoginFormInterface } from 'src/app/core/interfaces/login-form.interface';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class AgentService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.httpClient
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }),
        map((resp) => true),
        catchError((error) => of(false))
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

  createAgent(agent: AgentFormInterface) {
    return this.httpClient.post(`${base_url}/agents`, agent);
  }
}
