import { ProspectModel } from '../models/prospect.model';

export interface ProspectFormInterface {
  firstName: string;
  lastName: string;
  documentType: string;
  email: string;
  dateBirth: Date;
  phone: string;
  agent: string;
  middleName?: string;
  state?: string;
  coupleName?: string;
  couplesOccupation?: string;
  coupleIncome?: string;
  children?: string;
  childrenAge?: string;
  childrenOccupation?: string;
  retirementPlans?: string;
  lifeInsurance?: string;
  discretionaryIncome?: string;
  properties?: string;
  otherIncome?: string;
  observations?: string;
}

export interface IProspectsResponse {
  ok: boolean;
  prospects: ProspectModel[];
}
