import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { AddAssociatesComponent } from './app/views/pages/associates/add-associates/add-associates.component';
import { CustomersComponent } from './views/pages/customers/customers.component';
import { AssociatesComponent } from './views/pages/associates/associates.component';
import { AllAssociatesComponent } from './views/pages/associates/all-associates/all-associates.component';
import { AllCustomersComponent } from './views/pages/customers/all-customers/all-customers.component';
import { AddCustomersComponent } from './views/pages/customers/add-customers/add-customers.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    AddAssociatesComponent,
    CustomersComponent,
    AssociatesComponent,
    AllAssociatesComponent,
    AllCustomersComponent,
    AddCustomersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
