import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Ng2PaginationModule } from 'ng2-pagination'; //module for paginating for long job lists
import { Ng2OrderModule } from 'ng2-order-pipe'; //module for ordering the list items
import { MomentModule } from 'angular2-moment'; //module to display timo ago format in date
import { DatePickerModule } from 'ng2-datepicker'; // module to fix date input field not working in firefox
import { QuillEditorModule } from 'ng2-quill-editor'; //module for text editor input field


//components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResetComponent } from './components/reset/reset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

//components inside DashboardComponent
import { StudentComponent } from './components/dashboard/student/student.component';
import { EmployerComponent } from './components/dashboard/employer/employer.component';
import { AddJobComponent } from './components/dashboard/add-job/add-job.component';
import { ReadMoreComponent } from './components/dashboard/read-more/read-more.component';

//services
import { AuthenticationService } from './services/authentication.service';
import { ValidateService } from './services/validate.service';
import { JobsService } from './services/jobs.service';
import { AuthGuard } from './guards/auth.guard';




//configuring routes
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/add', component: AddJobComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id', component: ReadMoreComponent, canActivate: [AuthGuard] },
  { path: 'reset', component: ResetComponent},
  { path: 'reset/:token', component: ResetPasswordComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    StudentComponent,
    EmployerComponent,
    AddJobComponent,
    ReadMoreComponent,
    ResetComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    Ng2PaginationModule,
    Ng2OrderModule,
    MomentModule,
    DatePickerModule,
    QuillEditorModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ 
    AuthenticationService,
    ValidateService,
    JobsService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
