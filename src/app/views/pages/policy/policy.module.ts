import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AllPolicyComponent } from './all-policy/all-policy.component';
import { AddPolicyComponent } from './add-policy/add-policy.component';
import { PolicyRoutingModule } from './policy.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { SpinnerModule } from '../../components/spinner/spinner.module';
import { DollarFormatModule } from 'src/app/core/directive/dollarFormat/dollar-format.module';
import { SsnFormatDirectiveModule } from 'src/app/core/directive/ssnFormatDirective/ssn-format-directive.module';
import { MobilePhoneNumberDirectiveModule } from 'src/app/core/directive/mobilePhoneNumber/mobile-phone-number.module';

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
    SsnFormatDirectiveModule,
    MobilePhoneNumberDirectiveModule,
    DollarFormatModule,
  ],
})
export class PolicyModule {}
