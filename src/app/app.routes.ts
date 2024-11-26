import {Routes} from '@angular/router';

import {CreateAccFrameComponent} from './pages/authentication/create-acc-frame/create-acc-frame.component';
import {LoginFrameComponent} from './pages/authentication/login-frame/login-frame.component';
import {NotFoundGuard} from "../shared/guards/not-found/not-found.guard";
import {FakeTwitterComponent} from "./pages/fake-twitter/fake-twitter.component";
import {MyTweetsComponent} from "./pages/fake-twitter/my-tweets/my-tweets.component";
import {TweetsComponent} from "./pages/fake-twitter/tweets/tweets.component";
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
    path: 'fake-twitter',
    component: FakeTwitterComponent,
    children: [
      {path: '', redirectTo: 'tweets', pathMatch: 'full'},
      {path: 'tweets', component: TweetsComponent},
      {path: 'my-tweets', component: MyTweetsComponent},
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: LoginFrameComponent,
    canActivate: [NotFoundGuard],
  }
];
