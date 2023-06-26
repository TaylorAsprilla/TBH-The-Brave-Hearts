import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { CustomersModule } from './views/pages/customers/customers.module';
import { ProspectsModule } from './views/pages/prospect/prospects.module';
import { PolicyModule } from './views/pages/policy/policy.module';
import { SearchesModule } from './views/pages/searches/searches.module';
import { AdministratorModule } from './views/pages/administrator/administrator.module';

@NgModule({
  declarations: [AppComponent, ErrorPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    CustomersModule,
    ProspectsModule,
    PolicyModule,
    SearchesModule,
    AdministratorModule,
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
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
