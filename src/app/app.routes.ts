import { Routes } from '@angular/router';
import { LoginComponent } from './login-register-logout/login/login.component';
import { RegisterComponent } from './login-register-logout/register/register.component';
import { LoginOrRegisterComponent } from './login-register-logout/login-or-register/login-or-register.component';
import { HomeComponent } from './pages/home/home.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { LogoutComponent } from './login-register-logout/logout/logout.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee.component';
import { ProvideEmailAdressComponent } from './login-register-logout/provide-email-adress/provide-email-adress.component';
import { CheckRegistrationLinkComponent } from './login-register-logout/check-registration-link/check-registration-link.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { AddSubjectComponent } from './pages/add-subject/add-subject.component';
import { EditSubjectComponent } from './pages/edit-subject/edit-subject.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { EditDepartmentComponent } from './pages/edit-department/edit-department.component';
import { AddDepartmentComponent } from './pages/add-department/add-department.component';
import { canActivateTokenGuard } from './guards/auth-guard.service';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
  {
    path: 'account',
    children:[
      { path: '', title: 'Login or Register', component: LoginOrRegisterComponent },
      { path: 'login', title: 'Login', component: LoginComponent },
      { path: 'provideEmail', title: 'ProvideEmail', component: ProvideEmailAdressComponent },
      { path: 'registrationCheck', title: 'RegistrationCheck', component: CheckRegistrationLinkComponent },
      { path: 'register', title: 'Register', component: RegisterComponent },
    ]
  },
  {
    path: 'home',
    component:HomeComponent,
    children:[
      // {path:"",title: 'Home',component:HomeComponent},
      {path:"employees/add",title: 'Add Employee',component:AddEmployeeComponent},
      {path:"employees/:id",title: 'Employee',component:EditEmployeeComponent},
      {path:"employees",title: 'Employees',component:EmployeesComponent},
      {path:"subjects/add",title: 'AddSubject',component:AddSubjectComponent},
      {path:"subjects/:id",title: 'Subject',component:EditSubjectComponent},
      {path:"subjects",title: 'Subjects',component:SubjectsComponent},
      {path:"departments/add",title: 'AddDepartment',component:AddDepartmentComponent},
      {path:"departments/:id",title: 'Department',component:EditDepartmentComponent},
      {path:"departments",title: 'Departments',component:DepartmentsComponent},
      {path:"reports",title: 'Reports',component:ReportsComponent}
    ],
    canActivate:[canActivateTokenGuard]
  },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: '/account', pathMatch: 'full' },
  { path: '**', redirectTo: '/account', pathMatch: 'full' }
];
