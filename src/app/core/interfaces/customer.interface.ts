import { CustomerModel } from '../models/customer.model';
import { IPolicy } from './policy.interface';

export interface ICreateCustomer {
  customer: CustomerModel;
  policy: IPolicy;
}

export interface ICustomerPolicy {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}
