import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AgentService } from 'src/app/services/agent/agent.service';
import { AgentModel } from '../models/agent.model';
import { ROUTE_APP } from '../enum/router-app.enum';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate, CanLoad {
  constructor(private agentService: AgentService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.hasRole(route);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.hasRole(route);
  }

  private hasRole(route: Route | ActivatedRouteSnapshot) {
    let hasAccess = true;
    const agent: AgentModel = this.agentService.agent;
    const allowedRoles = route.data?.['allowedRoles'];

    if (agent && agent.role === allowedRoles[0]) {
      return hasAccess;
    } else {
      hasAccess = false;
      this.router.navigateByUrl(ROUTE_APP.DASHBOARD);
      return hasAccess;
    }
  }
}
