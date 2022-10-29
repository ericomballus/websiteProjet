import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { PostEditComponent } from './admin/posts/post-edit/post-edit.component';
import { PostsComponent } from './admin/posts/posts.component';
import { RubriqueAddComponent } from './admin/rubrique/rubrique-add/rubrique-add.component';
import { RubriqueComponent } from './admin/rubrique/rubrique.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { UsersComponent } from './admin/users/users.component';
import { VisitorsComponent } from './admin/visitors/visitors.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'post/post-edit', component: PostEditComponent },
  { path: 'setting', component: SettingsComponent },
  { path: 'visitors', component: VisitorsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'rubrique', component: RubriqueComponent },
  { path: 'rubrique/rubrique-add', component: RubriqueAddComponent },

  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
