import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProspectsComponent } from './add-prospects/add-prospects.component';
import { AllProspectsComponent } from './all-prospects/all-prospects.component';

const routes: Routes = [
  {
    path: 'add-prospects',
    component: AddProspectsComponent,
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
