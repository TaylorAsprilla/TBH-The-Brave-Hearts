import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProspectsComponent } from './add-prospects/add-prospects.component';
import { AllProspectsComponent } from './all-prospects/all-prospects.component';
import { StateResolver } from 'src/app/core/resolvers/state/state.resolver';

const routes: Routes = [
  {
    path: 'add-prospects',
    component: AddProspectsComponent,
    resolve: { states: StateResolver },
  },
  {
    path: 'all-prospects',
    component: AllProspectsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProspectsRoutingModule {}
