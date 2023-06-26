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

const routes: Routes = [
  {
    path: `${ROUTE_APP.ALL_CUSTOMERS}`,
    component: CustomersComponent,
  },
  {
    path: `${ROUTE_APP.ALL_POLICY}`,
    component: PolicyComponent,
  },
  {
    path: `${ROUTE_APP.ALL_PROSPECTS}`,
    component: ProspectsComponent,
  },
  {
    path: `${ROUTE_APP.ADD_AGENTS}/:${TEXT.ID}`,
    component: AddAgentsComponent,
    resolve: { states: StateResolver },
  },
  {
    path: `${ROUTE_APP.ALL_AGENTS}`,
    component: AllAgentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorRoutingModule {}
