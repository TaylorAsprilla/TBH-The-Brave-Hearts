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
    public phone: string,
    public agent: IProspectAgent,
    public status: string,
    public lastName?: string,
    public email?: string,
    public occupation?: string,
    public couplesName?: string,
    public couplesLastName?: string,
    public couplesOccupation?: string,
    public children?: string,
    public retirementPlans?: string,
    public lifeInsurance?: string,
    public properties?: string,
    public income1?: string,
    public income2?: string,
    public income3?: string,
    public surplusIncome?: string,
    public observations?: string,

    public active?: boolean,
    public createdAt?: Date
  ) {}
}
