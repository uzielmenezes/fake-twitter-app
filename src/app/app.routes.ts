import {Routes} from '@angular/router';

import {CreateAccFrameComponent} from './pages/authentication/create-acc-frame/create-acc-frame.component';
import {LoginFrameComponent} from './pages/authentication/login-frame/login-frame.component';
import {NotFoundGuard} from "../shared/guards/not-found/not-found.guard";
import {UserComponent} from "./pages/user/user/user.component";
import {AuthGuard} from "../shared/guards/auth/auth.guard";

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
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: LoginFrameComponent,
    canActivate: [NotFoundGuard],
  }
];
