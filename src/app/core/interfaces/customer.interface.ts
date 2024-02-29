import { CustomerModel, ICustomerAgent } from '../models/customer.model';
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

export interface IClient {
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  phone: string;
  email: string;
  maritalStatus: string;
  dateBirth: Date;
  documentNumber: string;
  documentType: string;
  countryBirth: string;
  cityBirth: string;
  gender: string;
  weight: string;
  height: string;
  employerName: string;
  annualIncome: string;
  agent: ICustomerAgent;
  middleName?: string;
  addressLine2?: string;
  city?: string;
  zipCode?: string;
  occupation?: string;
  timeEmployed?: string;
  householdIncome?: string;
  householdNetWorth?: string;
  statusInUS?: string;
  idNumber?: string;
  expirationDate?: Date;
}

export interface ICreateClient {
  customer: IClient;
  policy: {
    carrier: string;
    policyType: string;
    monthly: string;
    faceAmount: string;
  };
}
