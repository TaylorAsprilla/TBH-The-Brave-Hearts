import { IAgentPolicy } from '../interfaces/agent.interface';
import { ICustomerPolicy } from '../interfaces/customer.interface';
import {
  IBeneficiary,
  IDocument,
  IMedical,
  IReferral,
  IcontingentBeneficiary,
} from '../interfaces/policy.interface';

export class PolicyModel {
  constructor(
    public uid: string,
    public carrier: string,
    public policyType: string,
    public monthly: string,
    public faceAmount: string,
    public beneficiaries: IBeneficiary[],
    public contingentBeneficiary: IcontingentBeneficiary[],
    public medical: IMedical,
    public additionalQuestions: {
      criminalRecord: string;
      pleadedGuilty: string;
      anotherLife: string;
      appliedForLife: string;
      participateSport: string;
      involved: string;
    },
    public bankInformation: {
      draftPaymentDate: string;
      bank: string;
      accountNumber: number;
      routingNumber: number;
      notes?: string;
    },
    public referrals: IReferral[],
    public document: IDocument,
    public customer: ICustomerPolicy,
    public active?: boolean,
    public createdAt?: Date,
    public agent?: IAgentPolicy
  ) {}
}
