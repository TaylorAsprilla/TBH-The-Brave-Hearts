import { NgModule } from '@angular/core';
import { AddProspectsComponent } from './add-prospects/add-prospects.component';
import { AllProspectsComponent } from './all-prospects/all-prospects.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProspectsRoutingModule } from './prospects.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule } from '../../components/spinner/spinner.module';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { MobilePhoneNumberDirectiveModule } from 'src/app/core/directive/mobilePhoneNumber/mobile-phone-number.module';
import { DollarFormatModule } from 'src/app/core/directive/dollarFormat/dollar-format.module';

@NgModule({
  declarations: [AddProspectsComponent, AllProspectsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SweetAlert2Module,
    ProspectsRoutingModule,
    SpinnerModule,
    MobilePhoneNumberDirectiveModule,
    DollarFormatModule,
  ],
  providers: [ExporterService],
  exports: [AddProspectsComponent, AllProspectsComponent],
})
export class ProspectsModule {}
