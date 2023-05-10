import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  CustomerModel,
  LoadAllCustomersInterface,
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
    return this.httpClient.get<LoadAllCustomersInterface>(
      `${base_url}/customers/all`,
      this.headers
    );
  }

  createCustomer(customer: CustomerModel) {
    return this.httpClient.post(
      `${base_url}/customers`,
      customer,
      this.headers
    );
  }

  updateCustomer(customer: CustomerModel) {
    return this.httpClient.put(
      `${base_url}/customers/${this.uid}`,
      customer,
      this.headers
    );
  }
}
