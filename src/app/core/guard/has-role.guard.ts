import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AgentService } from 'src/app/services/agent/agent.service';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate, CanLoad {
  constructor(private agentService: AgentService) {}

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
    const allowedRoles = route.data?.['allowedRoles'];

    if (
      this.agentService.agent &&
      this.agentService.agent.role === allowedRoles[0]
    ) {
      return hasAccess;
    } else {
      hasAccess = false;
      alert('Access denied');
      return hasAccess;
    }
  }
}
