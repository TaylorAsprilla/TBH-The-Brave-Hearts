import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAgentsComponent } from './all-agents/all-agents.component';
import { AddAgentsComponent } from './add-agents/add-agents.component';
import { StateResolver } from 'src/app/core/resolvers/state/state.resolver';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { TEXT } from 'src/app/core/enum/text.enum';

const routes: Routes = [
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
export class AgentsRoutingModule {}
