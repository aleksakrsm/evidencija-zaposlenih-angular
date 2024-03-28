import { Routes } from '@angular/router';
import { LoginComponent } from './login-register-logout/login/login.component';
import { RegisterComponent } from './login-register-logout/register/register.component';
import { LoginOrRegisterComponent } from './login-register-logout/login-or-register/login-or-register.component';
import { HomeComponent } from './pages/home/home.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { LogoutComponent } from './login-register-logout/logout/logout.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee.component';

export const routes: Routes = [
  {
    path: 'account',
    children:[
      { path: '', title: 'Login or Register', component: LoginOrRegisterComponent },
      { path: 'login', title: 'Login', component: LoginComponent },
      { path: 'register', title: 'Register', component: RegisterComponent },
    ]
  },
  {
    path: 'home',
    component:HomeComponent,
    children:[
      // {path:"",title: 'Home',component:HomeComponent},
      {path:"employees/:id",title: 'Employees',component:EditEmployeeComponent},
      {path:"employees",title: 'Employees',component:EmployeesComponent},
      {path:"subjects",title: 'Subjects',component:SubjectsComponent}
    ]
  },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: '/account', pathMatch: 'full' },
  { path: '**', redirectTo: '/account', pathMatch: 'full' }
];
