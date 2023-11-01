import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { AgentService } from 'src/app/services/agent/agent.service';

@Injectable({
  providedIn: 'root',
})
export class AgentsResolver implements Resolve<boolean> {
  constructor(private agentService: AgentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.agentService.getAllAgents().pipe(
      catchError((error) => {
        return of('No data');
      })
    );
  }
}
