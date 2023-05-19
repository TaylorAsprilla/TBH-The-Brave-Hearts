export class StateModel {
  constructor(
    public id: number,
    public state: string,
    public abbreviation: string,
    public officialName?: string
  ) {}
}

export interface IStatesResponse {
  ok: boolean;
  states: StateModel[];
}
