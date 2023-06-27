import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { AllAgentsComponent } from './agents/all-agents/all-agents.component';
import { CustomersComponent } from './customers/customers.component';
import { PolicyComponent } from './policy/policy.component';
import { ProspectsComponent } from './prospects/prospects.component';
import { TEXT } from 'src/app/core/enum/text.enum';
import { AddAgentsComponent } from './agents/add-agents/add-agents.component';
import { StateResolver } from 'src/app/core/resolvers/state/state.resolver';
import { AgentResolver } from 'src/app/core/resolvers/agent/agent.resolver';

const routes: Routes = [
  {
    path: `${ROUTE_APP.ALL_CUSTOMERS}`,
    component: CustomersComponent,
    resolve: { agent: AgentResolver },
  },
  {
    path: `${ROUTE_APP.ALL_POLICY}`,
    component: PolicyComponent,
    resolve: { agent: AgentResolver },
  },
  {
    path: `${ROUTE_APP.ALL_PROSPECTS}`,
    component: ProspectsComponent,
    resolve: { agent: AgentResolver },
  },
  {
    path: `${ROUTE_APP.ADD_AGENTS}/:${TEXT.ID}`,
    component: AddAgentsComponent,
    resolve: { states: StateResolver, agent: AgentResolver },
  },
  {
    path: `${ROUTE_APP.ALL_AGENTS}`,
    component: AllAgentsComponent,
    resolve: { agent: AgentResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorRoutingModule {}
