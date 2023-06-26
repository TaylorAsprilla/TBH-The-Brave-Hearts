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

@NgModule({
  declarations: [
    AddAgentsComponent,
    AllAgentsComponent,
    CustomersComponent,
    PolicyComponent,
    ProspectsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SweetAlert2Module,
    FormsModule,
    AdministratorRoutingModule,
    SpinnerModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [CustomersComponent, PolicyComponent, ProspectsComponent],
})
export class AdministratorModule {}
