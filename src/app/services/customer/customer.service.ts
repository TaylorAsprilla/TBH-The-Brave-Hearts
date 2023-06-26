import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ICreateCustomer } from 'src/app/core/interfaces/customer.interface';
import {
  CustomerModel,
  ILoadAllCustomer,
  ILoadAllCustomers,
} from 'src/app/core/models/customer.model';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public customer: CustomerModel;

  constructor(private httpClient: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.customer.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  getAllCustomers() {
    return this.httpClient.get<ILoadAllCustomers>(
      `${base_url}/customers/all`,
      this.headers
    );
  }

  getAllCustomersForAgents(idAgent: string) {
    return this.httpClient.get<ILoadAllCustomers>(
      `${base_url}/customers/all/${idAgent}`,
      this.headers
    );
  }

  getCustomer(id: string) {
    return this.httpClient
      .get<ILoadAllCustomer>(`${base_url}/customers/${id}`, this.headers)
      .pipe(
        map((resp: { ok: boolean; customer: CustomerModel }) => resp.customer)
      );
  }

  createCustomer(customer: ICreateCustomer) {
    return this.httpClient.post(
      `${base_url}/customers`,
      customer,
      this.headers
    );
  }

  updateCustomer(customer: CustomerModel) {
    return this.httpClient.put(
      `${base_url}/customers/${customer.uid}`,
      customer,
      this.headers
    );
  }
}
