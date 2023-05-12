import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherIconModule } from '../../../core/feather-icon/feather-icon.module';

import {
  NgbAccordionModule,
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

import { GeneralComponent } from './general.component';
import { BlankComponent } from './blank/blank.component';
import { FaqComponent } from './faq/faq.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { ModalImageModule } from '../../components/modal-image/modal-image.module';

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
        path: 'blank-page',
        component: BlankComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },

      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    GeneralComponent,
    BlankComponent,
    FaqComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeatherIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule,
    ModalImageModule,
  ],
})
export class GeneralModule {}
