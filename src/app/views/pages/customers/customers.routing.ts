import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { AllCustomersComponent } from './all-customers/all-customers.component';

const routes: Routes = [
  {
    path: 'add-customers',
    component: AddCustomersComponent,
  },
  {
    path: 'all-customers',
    component: AllCustomersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
