interface IProspectAgent {
  _id: string;
  agentCode: number;
  firstName: string;
  lastName: string;
  email: string;
}

export class ProspectModel {
  constructor(
    public uid: string,
    public firstName: string,
    public lastName: string,
    public documentType: string,
    public email: string,
    public dateBirth: Date,
    public phone: string,
    public agent: IProspectAgent,
    public status: string,
    public middleName?: string,
    public state?: string,
    public coupleName?: string,
    public couplesOccupation?: string,
    public coupleIncome?: string,
    public children?: string,
    public childrenAge?: string,
    public childrenOccupation?: string,
    public retirementPlans?: string,
    public lifeInsurance?: string,
    public discretionaryIncome?: string,
    public properties?: string,
    public otherIncome?: string,
    public observations?: string,
    public active?: boolean,
    public createdAt?: Date
  ) {}
}
