import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AgentService } from 'src/app/services/agent/agent.service';

@Injectable({
  providedIn: 'root',
})
export class AgentResolver implements Resolve<any> {
  constructor(private agentService: AgentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    if (this.agentService.agent) {
      return of(this.agentService.agent);
    } else {
      return of(null);
    }
  }
}
