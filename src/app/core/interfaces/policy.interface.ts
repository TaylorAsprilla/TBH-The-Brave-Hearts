import { PolicyModel } from '../models/policy.model';

export interface IBeneficiary {
  firstName: string;
  middleName?: string;
  lastName: string;
  relationshipToInsured: string;
  phone: string;
  email: string;
  dateBirth?: Date;
  ss?: string;
  share?: string;
}

export interface IcontingentBeneficiary {
  firstName: string;
  middleName?: string;
  lastName: string;
  relationshipToInsured: string;
  phone: string;
  email: string;
  dateBirth?: Date;
  ss?: string;
  share?: string;
}

export interface IMedical {
  doctorName: string;
  doctorOfficeLocation?: string;
  officePhoneNumber?: string;
  lastVisit: Date;
  reasonForVisit?: string;
  outcomeOfVisit?: string;
  smoker: string;
  medicalCondition?: string;
  whenItWasDiagnosed?: string;
  dosage?: string;
  additionalInformation?: string;
  isFatherAlive: string;
  fatherAge?: string;
  deceasedFather?: string;
  isMotherAlive: string;
  motherAge?: string;
  deceasedMother?: string;
  notes?: string;
}

export interface IReferral {
  firstName: string;
  middleName?: string;
  lastName: string;
  relationshipToInsured: string;
  phone?: string;
  email?: string;
}

export interface IDocument {
  idPhoto?: string;
  document1?: string;
  document2?: string;
  primaryAgentName: string;
  carrierCode?: string;
  percentage1: string;
  secondaryAgentName?: string;
  percentage2?: string;
  fieldTrainingAgent?: string;
  mbBase?: string;
  notes?: string;
}

export interface ILoadAllPolicies {
  ok: boolean;
  policy: PolicyModel[];
}

export interface ILoadAllPolicy {
  ok: boolean;
  policy: PolicyModel;
}

export interface IPolicy {
  carrier: string;
  policyType: string;
  monthly: string;
  faceAmount: string;
  beneficiaries: IBeneficiary[];
  contingentBeneficiary: IcontingentBeneficiary[];
  medical: IMedical;
  additionalQuestions: {
    criminalRecord: string;
    pleadedGuilty: string;
    anotherLife: string;
    appliedForLife: string;
    participateSport: string;
    involved: string;
    notes?: string;
  };
  bankInformation: {
    draftPaymentDate: string;
    bank: string;
    accountNumber: number;
    routingNumber: number;
    notes?: string;
  };
  referrals: IReferral[];
  document: IDocument;
  status: string;
  active?: boolean;
  createdAt?: Date;
  agent?: string;
  customer?: string;
}

export interface policyDataExport {
  carrier: string;
  policyType: string;
  monthly: string;
  faceAmount: string;
  active?: boolean;
  createdAt?: Date;
  uid: string;
  status: string;
  nameAgent?: string;
  nameCustomer: string;
}
