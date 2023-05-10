import { environment } from 'src/environments/environment';

const imageProfile = environment.imageProfile;

interface BeneficiaryInterface {
  firstName: string;
  lastName: string;
  relationshipToInsured: string;
  phone: string;
  email: string;
  middleName?: string;
  dateBirth?: Date;
  ss?: string;
  share?: string;
}

interface ContingentBeneficiaryInterface {
  firstName: string;
  lastName: string;
  relationshipToInsured: string;
  phone: string;
  email: string;
  middleName?: string;
  dateBirth?: Date;
  ss?: string;
  share?: string;
}

interface MedicalInformationInterface {
  doctorName: string;
  lastVisit: string;
  smoker: string;
  doctorOfficeLocation?: string;
  officePhoneNumber?: string;
  reasonForVisit?: string;
  outcomeOfVisit?: string;
  medicalCondition?: string;
  whenItWasDiagnosed?: string;
  medications?: string;
  dosage?: string;
  additionalInformation?: string;
  isFatherAlive?: string;
  fatherAge?: string;
  deceasedFather?: string;
  isMotherAlive?: string;
  motherAge?: string;
  deceasedMother?: string;
}

interface AdditionalQuestionsInterface {
  criminalRecord: string;
  pleadedGuilty: string;
  anotherLife: string;
  appliedForLife: string;
  participateSport: string;
  involved: string;
}

interface BankInformationInterface {
  draftPaymentDate: string;
  bank: string;
  accountNumber: number;
  routingNumber: number;
  notes?: string;
}

interface DocumentInterface {
  idPhoto?: string;
  document1?: string;
  document2?: string;
  primaryAgentName?: string;
  percentage1?: string;
  secondaryAgentName?: string;
  percentage2?: string;
  fieldTrainingAgent?: string;
  mdBase?: string;
}

export interface LoadAllCustomersInterface {
  ok: boolean;
  customers: CustomerModel[];
}

export class CustomerModel {
  constructor(
    public uid: string,
    public carrier: string,
    public policityType: string,
    public monthly: string,
    public faceAmount: string,
    public firstName: string,
    public lastName: string,
    public address: string,
    public phone: string,
    public phoneType: string,
    public email: string,
    public maritalStatus: string,
    public dateBirth: Date,
    public ss: string,
    public countryBirth: string,
    public cityBirth: string,
    public gender: string,
    public weight: string,
    public height: string,
    public employerName: string,
    public annualIncome: string,
    public contingentBeneficiary: ContingentBeneficiaryInterface,
    public medical: MedicalInformationInterface,
    public additionalQuestions: AdditionalQuestionsInterface,
    public agent: number,
    public middleName?: string,
    public addressLine2?: string,
    public city?: string,
    public state?: string,
    public zipCode?: string,
    public greenCard?: string,
    public driversLicense?: string,
    public stateGreenCard?: string,
    public householdIncome?: string,
    public householdNetWorth?: string,
    public expiration?: string,
    public timeEmployed?: string,
    public occupation?: string,
    public beneficiaries?: BeneficiaryInterface[],
    public bankInformation?: BankInformationInterface,
    public document?: DocumentInterface,
    public img?: string,
    public createdAt?: Date,
    public active?: boolean
  ) {}

  get imageUrl() {
    if (this.img) {
      return `${imageProfile}/customers/${this.img}`;
    } else {
      return `${imageProfile}/customers/no-file.png`;
    }
  }
}
