import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssociatesComponent } from './add-associates/add-associates.component';
import { AllAssociatesComponent } from './all-associates/all-associates.component';

const routes: Routes = [
  {
    path: 'add-associates',
    component: AddAssociatesComponent,
  },
  {
    path: 'all-associates',
    component: AllAssociatesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssociatesRoutingModule {}
