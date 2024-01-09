import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers/customers.component';
import { PolicyComponent } from './policy/policy.component';
import { ProspectsComponent } from './prospects/prospects.component';
import { AdministratorRoutingModule } from './administrator.routing';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SpinnerModule } from '../../components/spinner/spinner.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAgentsComponent } from './agents/add-agents/add-agents.component';
import { AllAgentsComponent } from './agents/all-agents/all-agents.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { ReportsComponent } from './reports/reports.component';
import { ExportDataModule } from '../../components/export-data/export-data.module';
import { FiltersModule } from '../../components/filters/filters.module';
import { GeneratePdfModule } from '../../components/generate-pdf/generate-pdf.module';

@NgModule({
  declarations: [
    AddAgentsComponent,
    AllAgentsComponent,
    CustomersComponent,
    PolicyComponent,
    ProspectsComponent,
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SweetAlert2Module,
    HttpClientModule,
    FormsModule,
    AdministratorRoutingModule,
    SpinnerModule,
    NgSelectModule,
    ReactiveFormsModule,
    FiltersModule,
    ExportDataModule,
    GeneratePdfModule,
  ],
  exports: [CustomersComponent, PolicyComponent, ProspectsComponent],
})
export class AdministratorModule {}
