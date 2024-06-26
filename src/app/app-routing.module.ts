import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { HasRoleGuard } from './core/guard/has-role.guard';
import { ROL } from './views/layout/navbar/menu.model';
import { ROUTE_APP } from './core/enum/router-app.enum';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('./views/pages/customers/customers.routing').then(
            (m) => m.CustomersRoutingModule
          ),
      },
      {
        path: 'prospect',
        loadChildren: () =>
          import('./views/pages/prospect/prospects.routing').then(
            (m) => m.ProspectsRoutingModule
          ),
      },
      {
        path: 'policy',

        loadChildren: () =>
          import('./views/pages/policy/policy.routing').then(
            (m) => m.PolicyRoutingModule
          ),
      },
      {
        path: 'general',
        loadChildren: () =>
          import('./views/pages/general/general.module').then(
            (m) => m.GeneralModule
          ),
      },
      {
        path: 'searches',
        loadChildren: () =>
          import('./views/pages/searches/searches.routing').then(
            (m) => m.SearchesRoutingModule
          ),
      },

      {
        path: ROUTE_APP.ADMINISTRATOR,
        canLoad: [HasRoleGuard],
        canActivate: [HasRoleGuard],
        data: {
          allowedRoles: [ROL.ADMINISTRATOR],
        },

        loadChildren: () =>
          import('./views/pages/administrator/administrator.routing').then(
            (m) => m.AdministratorRoutingModule
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ],
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: 'Page Not Found',
      desc: "Oopps!! The page you were looking for doesn't exist.",
    },
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent,
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
