import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IvyCarouselModule } from 'angular-responsive-carousel';

import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { DisplayVideoComponent } from './pages/display-video/display-video.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { PostsComponent } from './admin/posts/posts.component';
import { UsersComponent } from './admin/users/users.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { PostEditComponent } from './admin/posts/post-edit/post-edit.component';
import { PostViewComponent } from './admin/posts/post-view/post-view.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { VisitorsComponent } from './admin/visitors/visitors.component';
import { LoginComponent } from './admin/login/login.component';
import { DisplayArticlesComponent } from './components/display-articles/display-articles.component';
//icons import here

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    DisplayVideoComponent,
    SidebarComponent,
    PostsComponent,
    UsersComponent,
    SettingsComponent,
    PostEditComponent,
    PostViewComponent,
    VisitorsComponent,
    LoginComponent,
    DisplayArticlesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSnackBarModule,
    IvyCarouselModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
