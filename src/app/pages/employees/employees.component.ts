import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components.layout/header/header.component';
import { EmployeePageComponent } from '../../components/employee-page/employee-page.component';
import { EmployeeFilterComponent } from '../../components/employee-filter/employee-filter.component';
import { EmployeesService } from '../../service/employees.service';
import { AcademicTitlesService } from '../../service/academicTitles.service';
import { AcademicTitle } from '../../domain/academicTitle.domain';
import { UsersService } from '../../service/users.service';
import { Observable, catchError } from 'rxjs';
import { EducationTitle } from '../../domain/educationTitle.domain';
import { EducationTitlesService } from '../../service/educationTitles.service';
import { DepartmentsService } from '../../service/departments.service';
import { Department } from '../../domain/department.domain';
import { EmployeeFilter } from '../../domain/employeeFilter';
import { Status } from '../../domain/status.enum';
import { Employee } from '../../domain/employee.domain';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    HeaderComponent,
    EmployeePageComponent,
    EmployeeFilterComponent,
    AsyncPipe,
    JsonPipe,
  ],
  template: `
    <!-- <p>employees works!</p> -->
    <app-employee-page
      [currentPage]="page"
      [totalPages]="totalPages"
      [employees]="employees"
      (outputPageSize)="sizeChanged($event)"
      (outputCurrentPage)="pageChanged($event)"
    ></app-employee-page>
    <br>
    <br>
    <br>
    <app-employee-filter
    [academicTitles]="academicTitles"
    [departments]="departments"
    [educationTitles]="educationTitles"
    (filterChanged)="filterChanged($event)"
    ></app-employee-filter>
    <br>
    <br>
    <button type="button">Add New Employee</button>
    <!-- {{employeeFilter | json}} -->
  `,
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  academicTitles: AcademicTitle[] = [];
  educationTitles: EducationTitle[] = [];
  departments: Department[] = [];
  employees: Employee[] = [];
  page: number = 1; //uzeti iz podkomponente
  size: number = 10; //uzeo
  employeeFilter: EmployeeFilter = {
    academicTitleId: -1,
    departmentId: -1,
    educationTitleId: -1,
    status: Status.Active,
  }; //uzeo
  totalPages: number = 1;
  constructor(
    private employeesService: EmployeesService,
    private academicTitlesService: AcademicTitlesService,
    private educationTitlesService: EducationTitlesService,
    private departmentsService: DepartmentsService,
    private usersService: UsersService
  ) {}
  ngOnInit(): void {

    this.employeesService
      .getEmployeesPage(1, 10, this.employeeFilter,this.usersService.userToken.token)
      .subscribe((x) => {
        this.employees = x.content;
        this.totalPages = x.totalPages;
        this.size = x.size;
      });

    this.academicTitlesService
      .getAll(this.usersService.userToken.token)
      // .pipe(catchError(x))
      .subscribe((x) => {
        // console.log('-----------------------');
        // console.log(x?.length);
        this.academicTitles = x;
        this.academicTitles.unshift({ id:-1, name: '-- Select --' });
      });

    this.educationTitlesService
      .getAll(this.usersService.userToken.token)
      .subscribe((x) => {(this.educationTitles = x);
        this.educationTitles.unshift({ id:-1, name: '-- Select --' });
      });

    this.departmentsService
      .getAll(this.usersService.userToken.token)
      .subscribe((x) => {this.departments = x;
        this.departments.unshift({ id:-1, name: '-- Select --' , shortName: '-- Select --' });
      });

  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this.employeesService
      .getEmployeesPage(newPage, this.size, this.employeeFilter,this.usersService.userToken.token)
      .subscribe((x) => {
        this.employees = x.content;
      });
  }

  sizeChanged(newSize: number): void {
    console.log("logika:" + newSize);
    this.size = newSize;
    this.employeesService
    .getEmployeesPage(1, newSize, this.employeeFilter,this.usersService.userToken.token)
    .subscribe((x) => {
      this.page = 1;
      console.log("subscribe:" + this.size);
        this.employees = x.content;
        this.totalPages = x.totalPages;
        console.log("x.content.length: ")
        console.log(x.content.length)
      });
  }

  filterChanged(newFilter: EmployeeFilter): void {
    this.employeeFilter = newFilter;
    this.employeesService
      .getEmployeesPage(1, this.size, this.employeeFilter,this.usersService.userToken.token)
      .subscribe((x) => {
        this.page = 1;
        this.employees = x.content;
        this.totalPages = x.totalPages;
      });
  }
}
