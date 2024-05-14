import { Component } from '@angular/core';
import { DepartmentInfoComponent } from '../../components/department-info/department-info.component';
import { DepartmentsService } from '../../service/departments.service';
import { UsersService } from '../../service/users.service';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../domain/department.domain';
import { Location } from '@angular/common';
import { EmployeePageComponent } from '../../components/employee-page/employee-page.component';
import { Employee } from '../../domain/employee.domain';
import { EmployeesService } from '../../service/employees.service';
import { EmployeeFilter } from '../../domain/employeeFilter';
import { Status } from '../../domain/status.enum';

@Component({
  selector: 'app-edit-department',
  standalone: true,
  imports: [DepartmentInfoComponent,EmployeePageComponent],
  template:`
    <app-department-info
      (departmentEmitter)="updateDepartment($event)"
      [department]="department"
    ></app-department-info>
    <app-employee-page
      [currentPage]="page"
      [totalPages]="totalPages"
      [employees]="employees"
      (outputPageSize)="sizeChanged($event)"
      (outputCurrentPage)="pageChanged($event)"
      [routeToEmployees]="'../..'"
    ></app-employee-page>
  `,
  styleUrl: './edit-department.component.scss'
})
export class EditDepartmentComponent {
  id!: number;
  department: Department = {
    name: '',
    shortName:""
  };
  employees: Employee[] = [];
  page: number = 1; //uzeti iz podkomponente
  size: number = 10; //uzeo
  totalPages: number = 1;
  employeeFilter: EmployeeFilter = {
    academicTitleId: -1,
    departmentId: -1,
    educationTitleId: -1,
    status: Status.Active,
  };

  constructor(
    private departmentsService: DepartmentsService,
    private employeesService:EmployeesService,
    private activatedRoute: ActivatedRoute,
    private location:Location
  ) {}
  pageChanged(newPage: number): void {
    this.page = newPage;
    this.employeesService
      .getEmployeesPage(newPage, this.size, this.employeeFilter)
      .subscribe((x) => {
        this.employees = x.content;
      });
  }

  sizeChanged(newSize: number): void {
    // console.log("logika:" + newSize);
    this.size = newSize;
    this.employeesService
    .getEmployeesPage(1, newSize, this.employeeFilter)
    .subscribe((x) => {
      this.page = 1;
        this.employees = x.content;
        this.totalPages = x.totalPages;
      });
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
    });
    // console.log("id::::"+this.id);
    this.employeeFilter.departmentId = this.id;
    this.departmentsService
      .getDepartment(this.id)
      .subscribe((x) => (this.department = x));
      // console.log("-------------------------------");
      // console.log(JSON.stringify(this.employeeFilter));
      this.employeesService
      .getEmployeesPage(1, 10, this.employeeFilter)
      .subscribe((x) => {
        this.employees = x.content;
        this.totalPages = x.totalPages;
        this.size = x.size;
      });
  }

  updateDepartment($event: Department) {
    // ovo izmeniti jer vraca novi emp umesto da update stari
    $event.id = this.id;
    this.departmentsService
      .updateDepartment($event)
      .pipe()
      .subscribe((x) => {
        console.log('============ID:====updated=========');
        console.log(x.id);
        this.department = x;
        // this.location.back();
      });
      
  }
}
