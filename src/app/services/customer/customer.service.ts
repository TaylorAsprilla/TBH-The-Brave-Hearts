import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import {
  IClient,
  ICreateClient,
  ICreateCustomer,
} from 'src/app/core/interfaces/customer.interface';
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

  getAllCustomers(): Observable<CustomerModel[]> {
    return this.httpClient
      .get<ILoadAllCustomers>(`${base_url}/customers/all`, this.headers)
      .pipe(
        map((resp: { ok: boolean; customers: CustomerModel[] }) =>
          resp.customers.map((customer) => {
            return new CustomerModel(
              customer.uid,
              customer.firstName,
              customer.lastName,
              customer.address,
              customer.state,
              customer.phone,
              customer.email,
              customer.maritalStatus,
              customer.dateBirth,
              customer.documentNumber,
              customer.documentType,
              customer.countryBirth,
              customer.cityBirth,
              customer.gender,
              customer.weight,
              customer.height,
              customer.employerName,
              customer.annualIncome,
              customer.agent,
              customer.middleName,
              customer.addressLine2,
              customer.city,
              customer.zipCode,
              customer.occupation,
              customer.timeEmployed,
              customer.householdIncome,
              customer.householdNetWorth,
              customer.statusInUS,
              customer.idNumber,
              customer.expirationDate,
              customer.idState,
              customer.img,
              customer.active,
              customer.createdAt
            );
          })
        )
      );
  }

  getAllCustomersForAgents(idAgent: string): Observable<CustomerModel[]> {
    return this.httpClient
      .get<ILoadAllCustomers>(
        `${base_url}/customers/all/${idAgent}`,
        this.headers
      )
      .pipe(
        map((resp: { ok: boolean; customers: CustomerModel[] }) =>
          resp.customers.map((customer) => {
            return new CustomerModel(
              customer.uid,
              customer.firstName,
              customer.lastName,
              customer.address,
              customer.state,
              customer.phone,
              customer.email,
              customer.maritalStatus,
              customer.dateBirth,
              customer.documentNumber,
              customer.documentType,
              customer.countryBirth,
              customer.cityBirth,
              customer.gender,
              customer.weight,
              customer.height,
              customer.employerName,
              customer.annualIncome,
              customer.agent,
              customer.middleName,
              customer.addressLine2,
              customer.city,
              customer.zipCode,
              customer.occupation,
              customer.timeEmployed,
              customer.householdIncome,
              customer.householdNetWorth,
              customer.statusInUS,
              customer.idNumber,
              customer.expirationDate,
              customer.idState,
              customer.img,
              customer.active,
              customer.createdAt
            );
          })
        )
      );
  }

  getCustomer(id: string) {
    return this.httpClient
      .get<ILoadAllCustomer>(`${base_url}/customers/${id}`, this.headers)
      .pipe(
        map((resp: { ok: boolean; customer: CustomerModel }) => resp.customer)
      );
  }

  createCustomer(customer: ICreateCustomer | ICreateClient) {
    return this.httpClient.post(
      `${base_url}/customers`,
      customer,
      this.headers
    );
  }

  updateCustomer(customer: IClient) {
    return this.httpClient.put(
      `${base_url}/customers/${customer.uid}`,
      customer,
      this.headers
    );
  }
}
