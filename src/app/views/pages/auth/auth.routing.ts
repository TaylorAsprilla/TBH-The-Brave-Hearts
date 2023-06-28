import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { RecoverAccountComponent } from './recover-account/recover-account.component';
import { NewPasswordComponent } from './new-password/new-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: ROUTE_APP.LOGIN,
        pathMatch: 'full',
      },
      {
        path: ROUTE_APP.LOGIN,
        component: LoginComponent,
      },
      {
        path: 'recover-account',
        component: RecoverAccountComponent,
      },
      {
        path: 'new-password/:token',
        component: NewPasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
