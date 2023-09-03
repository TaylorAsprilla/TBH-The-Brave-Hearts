import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherIconModule } from '../../../core/directive/feather-icon/feather-icon.module';

import {
  NgbAccordionModule,
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

import { GeneralComponent } from './general.component';
import { FaqComponent } from './faq/faq.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { ModalImageModule } from '../../components/modal-image/modal-image.module';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { TEXT } from 'src/app/core/enum/text.enum';
import { AddAgentsComponent } from '../administrator/agents/add-agents/add-agents.component';
import { StateResolver } from 'src/app/core/resolvers/state/state.resolver';
import { AgentResolver } from 'src/app/core/resolvers/agent/agent.resolver';

const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
    children: [
      {
        path: '',
        redirectTo: 'blank-page',
        pathMatch: 'full',
      },

      {
        path: 'faq',
        component: FaqComponent,
      },

      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: `${ROUTE_APP.ADD_AGENTS}/:${TEXT.ID}`,
        component: AddAgentsComponent,
        resolve: { states: StateResolver, agent: AgentResolver },
      },
    ],
  },
];

@NgModule({
  declarations: [GeneralComponent, FaqComponent, ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FeatherIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule,
    ModalImageModule,
  ],
})
export class GeneralModule {}
