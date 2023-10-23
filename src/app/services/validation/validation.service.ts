import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  validationCustomerEmail(email: string) {
    return this.httpClient.get(
      `${base_url}/validation/customer/email/${email}`,
      this.headers
    );
  }

  validationCustomerDocument(documentNumber: string) {
    return this.httpClient.get(
      `${base_url}/validation/customer/document/${documentNumber}`,
      this.headers
    );
  }
}
