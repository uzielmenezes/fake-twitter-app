import { Routes } from '@angular/router';

import { CreateAccFrameComponent } from './pages/authentication/create-acc-frame/create-acc-frame.component';
import { LoginFrameComponent } from './pages/authentication/login-frame/login-frame.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginFrameComponent,
  },
  {
    path: 'create',
    component: CreateAccFrameComponent,
  },
];
