import { CustomerModel } from '../models/customer.model';
import { PolicyModel } from '../models/policy.model';

export interface ICreateCustomer {
  customer: CustomerModel;
  policy: PolicyModel;
}
