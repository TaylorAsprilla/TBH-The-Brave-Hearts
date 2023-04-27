export class AgentModel {
  constructor(
    public uid: string,
    public agentCode: number,
    public firstName: string,
    public lastName: string,
    public state: string,
    public email: string,
    public city?: string,
    public zip?: string,
    public password?: string,
    public role?: string,
    public img?: string,
    public active?: boolean,
    public createdAt?: Date
  ) {}
}
