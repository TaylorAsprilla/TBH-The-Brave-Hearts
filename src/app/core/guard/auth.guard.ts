import { Injectable } from '@angular/core';
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AgentService } from 'src/app/services/agent/agent.service';
import { ROUTE_APP } from '../enum/router-app.enum';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private agentService: AgentService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.agentService.validateToken().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigateByUrl(ROUTE_APP.AUTH_LOGIN);
        }
      })
    );
  }

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
