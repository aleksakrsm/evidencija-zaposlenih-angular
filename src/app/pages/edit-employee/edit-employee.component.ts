import { Component, OnInit } from '@angular/core';
import { Employee } from '../../domain/employee.domain';
import { EmployeesService } from '../../service/employees.service';
import { UsersService } from '../../service/users.service';
import { ActivatedRoute } from '@angular/router';
import { AcademicTitle } from '../../domain/academicTitle.domain';
import { EducationTitle } from '../../domain/educationTitle.domain';
import { Department } from '../../domain/department.domain';
import { AcademicTitlesService } from '../../service/academicTitles.service';
import { EducationTitlesService } from '../../service/educationTitles.service';
import { DepartmentsService } from '../../service/departments.service';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';
import { CommonModule, Location } from '@angular/common';
import { Status } from '../../domain/status.enum';
import { AcademicTitleHistoryComponent } from '../../components/academic-title-history/academic-title-history.component';
import { EmployeeAcademicTitle } from '../../domain/employeeAcademicTitle.domain';
import { AcademicTitleHistoryService } from '../../service/academicTitleHistory.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [EmployeeInfoComponent, AcademicTitleHistoryComponent],
  // templateUrl: './edit-employee.component.html',
  template: `
    <h2>Employee {{ employee.firstname }} {{ employee.lastname }}</h2>

    <!-- radi: -->
    <!-- {{ employee?.firstname }} -->
    <app-employee-info
      [academicTitles]="academicTitles"
      [departments]="departments"
      [educationTitles]="educationTitles"
      (employeeEmitter)="updateEmployee($event)"
      [employee]="employee"
    ></app-employee-info>
    <app-academic-title-history
     [employeeID]="id"
     [academicTitles]="academicTitles" 
     [employee]="employee"
     (historyEmitter)="saveHistory($event)"
     ></app-academic-title-history>
     <!-- (deleteHistoryEmitter)="saveHistory($event)" -->
  `,
  styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent implements OnInit {

  id!: number;
  employee: Employee = {
    firstname: '',
    lastname: '',
    academicTitle: { id: -1, name: '' },
    educationTitle: { id: -1, name: '' },
    department: { id: -1, name: '', shortName: '' },
    birthday: new Date(1, 1, 1),
    status: Status.Active,
  };
  academicTitles: AcademicTitle[] = [];
  educationTitles: EducationTitle[] = [];
  departments: Department[] = [];
  constructor(
    private employeesService: EmployeesService,
    private usersService: UsersService,
    private location: Location,
    private academicTitlesService: AcademicTitlesService,
    private historyService: AcademicTitleHistoryService,
    private educationTitlesService: EducationTitlesService,
    private departmentsService: DepartmentsService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
    });
    this.employeesService
      .getEmployee(this.id, this.usersService.userToken.token)
      .subscribe((x) => (this.employee = x));
    this.academicTitlesService
      .getAll(this.usersService.userToken.token)
      .subscribe((x) => {
        this.academicTitles = x;
        this.academicTitles.unshift({ id: -1, name: '-- Select --' });
      });

    this.educationTitlesService
      .getAll(this.usersService.userToken.token)
      .subscribe((x) => {
        this.educationTitles = x;
        this.educationTitles.unshift({ id: -1, name: '-- Select --' });
      });

    this.departmentsService
      .getAll(this.usersService.userToken.token)
      .subscribe((x) => {
        this.departments = x;
        this.departments.unshift({
          id: -1,
          name: '-- Select --',
          shortName: '-- Select --',
        });
      });
  }
  updateEmployee($event: Employee) {
    // ovo izmeniti jer vraca novi emp umesto da update stari
    $event.id = this.id;
    this.employeesService
      .updateEmployee($event, this.usersService.userToken.token)
      .pipe()
      .subscribe((x) => {
        console.log('============ID:=============');
        console.log(x.id);
        // this.location.back();
      });
  }
  saveHistory($event:{toSave:EmployeeAcademicTitle[],toDelete:EmployeeAcademicTitle[]}) {
    // this.historyService.saveEmployeeAcademicTitleHistory(history,this.usersService.userToken.token).subscribe();
    if($event.toSave.length==0&&$event.toDelete.length==0)
      return;
    this.historyService.saveEmployeeAcademicTitleHistory($event.toSave,$event.toDelete,this.usersService.userToken.token).subscribe(
      x=>{ });
  }
}
