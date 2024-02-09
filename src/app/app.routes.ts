import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForumComponent } from './categories/forum/forum.component';
import { authGuard } from './auth/auth.guard';
import { CategoryComponent } from './categories/category/category.component';
import { ThreadComponent } from './threads/thread/thread.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/forum', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'forum', component: ForumComponent, canActivate: [authGuard] },
  {
    path: 'forum/:category_id',
    component: CategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'forum/:category_id/:thread_id',
    component: ThreadComponent,
    canActivate: [authGuard],
  },
];
