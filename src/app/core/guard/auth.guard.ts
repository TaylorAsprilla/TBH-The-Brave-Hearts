import { Injectable } from '@angular/core';
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AgentService } from 'src/app/services/agent/agent.service';
import { ROUTE_APP } from '../enum/router-app.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private agentService: AgentService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.agentService.validateToken().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigateByUrl(ROUTE_APP.AUTH_LOGIN);
        }
      })
    );
  }
}
