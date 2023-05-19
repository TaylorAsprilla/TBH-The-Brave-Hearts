import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, catchError } from 'rxjs';
import { StateService } from 'src/app/services/state/state.service';

@Injectable({
  providedIn: 'root',
})
export class StateResolver implements Resolve<boolean> {
  constructor(private stateService: StateService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.stateService.getSates().pipe(
      catchError((error) => {
        return of('No dara');
      })
    );
  }
}
