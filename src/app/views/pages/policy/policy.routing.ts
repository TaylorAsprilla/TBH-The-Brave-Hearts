import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateResolver } from 'src/app/core/resolvers/state/state.resolver';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { TEXT } from 'src/app/core/enum/text.enum';
import { AddPolicyComponent } from './add-policy/add-policy.component';
import { AllPolicyComponent } from './all-policy/all-policy.component';

const routes: Routes = [
  {
    path: `${ROUTE_APP.ADD_POLICY}/:${TEXT.ID}`,
    component: AddPolicyComponent,
    resolve: { states: StateResolver },
  },
  {
    path: `${ROUTE_APP.ADD_POLICY}`,
    component: AddPolicyComponent,
    resolve: { states: StateResolver },
  },
  {
    path: `${ROUTE_APP.ALL_POLICY}`,
    component: AllPolicyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyRoutingModule {}
