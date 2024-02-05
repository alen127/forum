import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForumComponent } from './forum/forum.component';
import { authGuard } from './auth.guard';
import { CategoryComponent } from './category/category.component';
import { ThreadComponent } from './thread/thread.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'forum', component: ForumComponent, canActivate: [authGuard] },
  { path: 'forum/:category_id', component: CategoryComponent },
  { path: 'forum/:category_id/:thread_id', component: ThreadComponent },
];
