import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAssociatesComponent } from './add-associates/add-associates.component';
import { AllAssociatesComponent } from './all-associates/all-associates.component';
import { AssociatesRoutingModule } from './associates.routing';

@NgModule({
  declarations: [AddAssociatesComponent, AllAssociatesComponent],
  imports: [CommonModule, AssociatesRoutingModule],
  exports: [AddAssociatesComponent, AllAssociatesComponent],
})
export class AssociatesModule {}
