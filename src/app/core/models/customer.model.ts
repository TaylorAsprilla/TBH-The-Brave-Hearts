import { environment } from 'src/environments/environment';

const imageProfile = environment.imageProfile;

export interface ILoadAllCustomers {
  ok: boolean;
  customers: CustomerModel[];
}

export interface ILoadAllCustomer {
  ok: boolean;
  customer: CustomerModel;
}

export class CustomerModel {
  constructor(
    public uid: string,
    public firstName: string,
    public lastName: string,
    public address: string,
    public state: string,
    public phone: string,
    public email: string,
    public maritalStatus: string,
    public dateBirth: Date,
    public documentNumber: string,
    public documentType: string,
    public countryBirth: string,
    public cityBirth: string,
    public gender: string,
    public weight: string,
    public height: string,
    public employerName: string,
    public annualIncome: string,
    public agent: string,
    public middleName?: string,
    public addressLine2?: string,
    public city?: string,
    public zipCode?: string,
    public occupation?: string,
    public timeEmployed?: string,
    public householdIncome?: string,
    public householdNetWorth?: string,
    public img?: string,
    public active?: boolean,
    public createdAt?: Date
  ) {}

  get imageUrl() {
    if (this.img) {
      return `${imageProfile}/customers/${this.img}`;
    } else {
      return `${imageProfile}/customers/no-file.jpg`;
    }
  }
}
