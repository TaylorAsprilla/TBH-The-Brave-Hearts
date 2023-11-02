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
import { MobilePhoneNumberDirectiveModule } from 'src/app/core/directive/mobilePhoneNumber/mobile-phone-number.module';
import { DollarFormatModule } from 'src/app/core/directive/dollarFormat/dollar-format.module';
import { FiltersModule } from '../../components/filters/filters.module';
import { ExportDataModule } from '../../components/export-data/export-data.module';

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
    FiltersModule,
    ExportDataModule,
  ],

  exports: [AddProspectsComponent, AllProspectsComponent],
})
export class ProspectsModule {}
