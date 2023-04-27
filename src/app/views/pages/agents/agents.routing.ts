import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAgentsComponent } from './all-agents/all-agents.component';
import { AddAgentsComponent } from './add-agents/add-agents.component';

const routes: Routes = [
  {
    path: 'add-agents',
    component: AddAgentsComponent,
  },
  {
    path: 'all-agents',
    component: AllAgentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentsRoutingModule {}
