import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPolicyComponent } from './all-policy/all-policy.component';
import { AddPolicyComponent } from './add-policy/add-policy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ArchwizardModule } from 'angular-archwizard';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SpinnerModule } from '../../components/spinner/spinner.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { PolicyRoutingModule } from './policy.routing';

@NgModule({
  declarations: [AllPolicyComponent, AddPolicyComponent],
  imports: [
    CommonModule,
    PolicyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    ArchwizardModule,
    DropzoneModule,
    SpinnerModule,
    NgSelectModule,
  ],
})
export class PolicyModule {}
