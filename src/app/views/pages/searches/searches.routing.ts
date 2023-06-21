import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { TEXT } from 'src/app/core/enum/text.enum';
import { SearchesComponent } from './searches.component';

const routes: Routes = [
  {
    path: `${ROUTE_APP.SEARCH}/:${TEXT.VALUE}`,
    component: SearchesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchesRoutingModule {}
