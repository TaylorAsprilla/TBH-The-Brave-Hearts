import { ProspectModel } from '../models/prospect.model';

export interface ProspectFormInterface {
  uid: string;
  firstName: string;
  phone: string;
  status: string;
  lastName?: string;
  email?: string;
  occupation?: string;
  couplesName?: string;
  couplesLastName?: string;
  couplesOccupation?: string;
  children?: string;
  retirementPlans?: string;
  lifeInsurance?: string;
  properties?: string;
  income1?: string;
  income2?: string;
  income3?: string;
  surplusIncome?: string;
  observations?: string;
}

export interface ILoadAllProspectsInterface {
  ok: boolean;
  prospects: ProspectModel[];
}

export interface ILoadAllProspectInterface {
  ok: boolean;
  prospect: ProspectModel;
}
