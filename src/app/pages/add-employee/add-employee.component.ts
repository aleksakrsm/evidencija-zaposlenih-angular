import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';
import { Department } from '../../domain/department.domain';
import { AcademicTitle } from '../../domain/academicTitle.domain';
import { EducationTitle } from '../../domain/educationTitle.domain';
import { EmployeesService } from '../../service/employees.service';
import { AcademicTitlesService } from '../../service/academicTitles.service';
import { DepartmentsService } from '../../service/departments.service';
import { EducationTitlesService } from '../../service/educationTitles.service';
import { UsersService } from '../../service/users.service';
import { Employee } from '../../domain/employee.domain';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [EmployeeInfoComponent],
  template:`
    <app-employee-info [academicTitles]="academicTitles" [departments]="departments" [educationTitles]="educationTitles" (employeeEmitter)="saveEmployee($event)" [showStatus]="false"></app-employee-info>
  `,
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit{
  academicTitles: AcademicTitle[] = [];
  educationTitles: EducationTitle[] = [];
  departments: Department[] = [];
  constructor(
    private location: Location,
    private employeesService: EmployeesService,
    private academicTitlesService: AcademicTitlesService,
    private educationTitlesService: EducationTitlesService,
    private departmentsService: DepartmentsService,
    // private usersService: UsersService
    ) {}
    ngOnInit(): void {
      
      this.academicTitlesService
      .getAll()
      .subscribe((x) => {
        this.academicTitles = x;
        this.academicTitles.unshift({ id:-1, name: '-- Select --' });
      });

    this.educationTitlesService
      .getAll()
      .subscribe((x) => {(this.educationTitles = x);
        this.educationTitles.unshift({ id:-1, name: '-- Select --' });
      });

    this.departmentsService
      .getAll()
      .subscribe((x) => {this.departments = x;
        this.departments.unshift({ id:-1, name: '-- Select --' , shortName: '-- Select --' });
      });

    }
    saveEmployee($event: Employee) {
      this.employeesService.saveEmployee($event).pipe().subscribe(x=>{
        console.log("============ID:=============");
        console.log(x.id);
        this.location.back();
      });
    }
}
