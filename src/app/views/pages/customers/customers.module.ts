import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ArchwizardModule } from 'angular-archwizard';
import { SortablejsModule } from 'ngx-sortablejs';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { CustomersRoutingModule } from './customers.routing';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SpinnerModule } from '../../components/spinner/spinner.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditCustomersComponent } from './edit-customers/edit-customers.component';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { SsnFormatDirectiveModule } from 'src/app/core/directive/ssnFormatDirective/ssn-format-directive.module';
import { MobilePhoneNumberDirectiveModule } from 'src/app/core/directive/mobilePhoneNumber/mobile-phone-number.module';
import { DollarFormatModule } from 'src/app/core/directive/dollarFormat/dollar-format.module';

@NgModule({
  declarations: [
    AllCustomersComponent,
    AddCustomersComponent,
    EditCustomersComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    SortablejsModule.forRoot({
      animation: 150,
      ghostClass: 'bg-light',
    }),
    ArchwizardModule,
    DropzoneModule,
    SpinnerModule,
    NgSelectModule,
    SsnFormatDirectiveModule,
    MobilePhoneNumberDirectiveModule,
    DollarFormatModule,
  ],
  exports: [AllCustomersComponent, AddCustomersComponent],
  providers: [ExporterService],
})
export class CustomersModule {}
