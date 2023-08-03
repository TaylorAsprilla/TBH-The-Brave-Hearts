import { ProspectModel } from '../models/prospect.model';

export interface ProspectFormInterface {
  firstName: string;
  lastName: string;
  documentType?: string;
  email: string;
  dateBirth?: Date;
  phone?: string;
  agent: string;
  middleName?: string;
  state?: string;
  partner?: string;
  occupation?: string;
  householdIncome?: string;
  children?: string;
  childrenAge?: string;
  childrenOccupation?: string;
  retirementPlans?: string;
  lifeInsurance?: string;
  discretionaryIncome?: string;
  properties?: string;
  otherIncome?: string;
  observations?: string;
  status?: string;
}

export interface ILoadAllProspectsInterface {
  ok: boolean;
  prospects: ProspectModel[];
}

export interface ILoadAllProspectInterface {
  ok: boolean;
  prospect: ProspectModel;
}
