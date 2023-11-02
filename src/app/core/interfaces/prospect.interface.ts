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

export interface prospectDataExport {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  occupation?: string;
  partnerName?: string;
  partnerLastName?: string;
  partnerOccupation?: string;
  couplesName?: string;
  couplesLastName?: string;
  couplesOccupation?: string;
  children?: string;
  retirementPlans?: string;
  lifeInsurance?: string;
  properties?: string;
  partnerIncome?: string;
  additionalIncome?: string;
  surplusIncome?: string;
  observations?: string;
  status?: string;
  nameAgent?: string;
  createdAt?: Date;
}
