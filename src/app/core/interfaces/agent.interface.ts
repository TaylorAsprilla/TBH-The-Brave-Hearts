import { AgentModel } from '../models/agent.model';

export interface AgentFormInterface {
  agentCode: number;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
}

export interface AgentUpdateFormInterface {
  agentCode: number;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zip: string;
  email: string;
}

export interface LoadAllAgentsInterface {
  ok: boolean;
  agents: AgentModel[];
}

export interface LoadAllAgentInterface {
  ok: boolean;
  agent: AgentModel;
}
export interface ChangePadswordInterface {
  agentCode: number;
  oldPassword: string;
  newPassword: string;
}

export interface IAgentPolicy {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}
