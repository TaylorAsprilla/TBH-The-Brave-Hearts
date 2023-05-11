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