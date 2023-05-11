import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAgentsComponent } from './all-agents/all-agents.component';
import { AgentsRoutingModule } from './agents.routing';
import { AddAgentsComponent } from './add-agents/add-agents.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerModule } from '../../components/spinner/spinner.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AddAgentsComponent, AllAgentsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
  ],
  exports: [AddAgentsComponent, AllAgentsComponent],
})
export class AgentsModule {}
