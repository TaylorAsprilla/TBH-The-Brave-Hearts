import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProspectsComponent } from './add-prospects/add-prospects.component';
import { AllProspectsComponent } from './all-prospects/all-prospects.component';
import { StateResolver } from 'src/app/core/resolvers/state/state.resolver';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { TEXT } from 'src/app/core/enum/text.enum';

const routes: Routes = [
  {
    path: `${ROUTE_APP.ADD_PROSPECTS}/:${TEXT.ID}`,
    component: AddProspectsComponent,
    resolve: { states: StateResolver },
  },
  {
    path: `${ROUTE_APP.ALL_PROSPECTS}`,
    component: AllProspectsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProspectsRoutingModule {}
