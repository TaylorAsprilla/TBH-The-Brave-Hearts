import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { StateResolver } from 'src/app/core/resolvers/state/state.resolver';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { TEXT } from 'src/app/core/enum/text.enum';
import { EditCustomersComponent } from './edit-customers/edit-customers.component';

const routes: Routes = [
  {
    path: `${ROUTE_APP.ADD_CUSTOMERS}/:${TEXT.ID}`,
    component: AddCustomersComponent,
    resolve: { states: StateResolver },
  },
  {
    path: `${ROUTE_APP.ADD_CUSTOMERS}/:${TEXT.RUTA}/:${TEXT.ID}`,
    component: AddCustomersComponent,
    resolve: { states: StateResolver },
  },
  {
    path: `${ROUTE_APP.ALL_CUSTOMERS}`,
    component: AllCustomersComponent,
  },
  {
    path: `${ROUTE_APP.EDIT_CUSTOMERS}/:${TEXT.ID}`,
    component: EditCustomersComponent,
    resolve: { states: StateResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
