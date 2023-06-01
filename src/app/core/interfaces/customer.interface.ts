import { CustomerModel } from '../models/customer.model';
import { PolicyModel } from '../models/policy.model';
import { IPolicy } from './policy.interface';

export interface ICreateCustomer {
  customer: CustomerModel;
  policy: IPolicy;
}

export interface ICustomerPolicy {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
}
