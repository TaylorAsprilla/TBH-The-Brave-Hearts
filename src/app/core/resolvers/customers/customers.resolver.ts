import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersResolver implements Resolve<boolean> {
  constructor(private customerService: CustomerService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.customerService.getAllCustomers().pipe(
      catchError((error) => {
        return of('No data');
      })
    );
  }
}
