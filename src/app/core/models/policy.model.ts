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

export interface IMedical {
  doctorName: string;
  doctorOfficeLocation?: string;
  officePhoneNumber?: string;
  lastVisit: string;
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
  percentage1: string;
  secondaryAgentName?: string;
  percentage2?: string;
  fieldTrainingAgent?: string;
  mdBase?: string;
}

export interface ILoadAllPolicy {
  ok: boolean;
  policy: PolicyModel[];
}

export class PolicyModel {
  constructor(
    public carrier: string,
    public policyType: string,
    public monthly: string,
    public faceAmount: string,
    public beneficiaries: IBeneficiary[],
    public contingentBeneficiary: IBeneficiary[],
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
    public document: Document,
    public uid?: string,
    public active?: boolean,
    public createdAt?: Date,
    public agent?: string,
    public customer?: string
  ) {}
}
