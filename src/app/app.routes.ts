import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { FormComponent } from './pages/form/form.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyRecordsComponent } from './pages/my-records/my-records.component';
import {ChartsComponent}from'./pages/charts/charts.component';
export const routes: Routes = [
     {
    path: '', //anasayfa
    component: HomeComponent
  },
    {
        path: 'login',        
        component: LoginComponent   

         },

         {
  path: 'register',
  component: RegisterComponent
},

{
  path: 'confirm-email',
  component: ConfirmEmailComponent
},

{
 path: 'form',
  component: FormComponent,
  canActivate: [authGuard]
},

{
  path: 'forgot-password',
  component: ForgotPasswordComponent
},

{
  path: 'reset-password',
  component: ResetPasswordComponent
},

{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
},

{
  path: 'my-records',
  component: MyRecordsComponent,
  canActivate: [authGuard]
},
{
  path: 'charts',
  component: ChartsComponent,
  canActivate: [authGuard]
}
];
