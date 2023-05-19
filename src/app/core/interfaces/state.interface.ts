import { StateModel } from '../models/state.model';

export interface IStatesResponse {
  ok: boolean;
  states: StateModel[];
}
