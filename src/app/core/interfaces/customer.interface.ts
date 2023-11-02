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

export interface customerDataExport {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  address?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  maritalStatus?: string;
  dateBirth?: Date;
  documentNumber?: string;
  countryBirth?: string;
  cityBirth?: string;
  gender?: string;
  weight?: string;
  height?: string;
  employerName?: string;
  timeEmployed?: string;
  annualIncome?: string;
  householdIncome?: string;
  householdNetWorth?: string;
  documentType?: string;
  nameAgent?: string;
  createdAt?: Date;
}
