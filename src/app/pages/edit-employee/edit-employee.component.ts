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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../components/confirmDialog';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [EmployeeInfoComponent, AcademicTitleHistoryComponent,CommonModule],
  template: `
    <h2>Employee {{ employee.firstname }} {{ employee.lastname }}</h2>
    <app-employee-info
      [academicTitles]="academicTitles"
      [departments]="departments"
      [educationTitles]="educationTitles"
      (employeeEmitter)="updateEmployee($event)"
      [employee]="employee"
    ></app-employee-info>
    <button *ngIf="employee.status==='ACTIVE'" mat-raised-button (click)="openConfirmDeleteDialog('0ms', '0ms')">Delete Employee</button>
    <button *ngIf="employee.status==='INACTIVE'" mat-raised-button (click)="openConfirmRestoreDialog('0ms', '0ms')">Restore Employee</button>
    <app-academic-title-history
     [employeeID]="id"
     [academicTitles]="academicTitles" 
     [employee]="employee"
     (historyEmitter)="saveHistory($event)"
     ></app-academic-title-history>
  `,
  styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent implements OnInit {
  openConfirmDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ConfirmDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        title:"Delete Employee",
        message:"Are You sure You want to delete this employee? This action will only logically delete employee."
      }
    }).afterClosed().subscribe(x=>{
      let result:boolean = x;
      if(result){
        this.employeesService.deleteLogically(this.id).subscribe(x=>this.employee = x);
      }
    });
  }
  openConfirmRestoreDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ConfirmDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        title:"Restore Employee",
        message:"Are You sure You want to restore this employee? This action will logically restore employee."
      }
    }).afterClosed().subscribe(x=>{
      let result:boolean = x;
      if(result){
        this.employeesService.restoreLogically(this.employee).subscribe(x=>this.employee = x);
      }
    });
  }

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
    public dialog: MatDialog,
    private employeesService: EmployeesService,
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
      .getEmployee(this.id)
      .subscribe((x) => (this.employee = x));
    this.academicTitlesService
      .getAll()
      .subscribe((x) => {
        this.academicTitles = x;
        this.academicTitles.unshift({ id: -1, name: '-- Select --' });
      });

    this.educationTitlesService
      .getAll()
      .subscribe((x) => {
        this.educationTitles = x;
        this.educationTitles.unshift({ id: -1, name: '-- Select --' });
      });

    this.departmentsService
      .getAll()
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
      .updateEmployee($event)
      .pipe()
      .subscribe((x) => {
        console.log('============ID:=============');
        console.log(x.id);
        // this.location.back();
      });
  }
  saveHistory($event:{toSave:EmployeeAcademicTitle[],toDelete:EmployeeAcademicTitle[]}) {
    if($event.toSave.length==0&&$event.toDelete.length==0)
      return;
    this.historyService.saveEmployeeAcademicTitleHistory($event.toSave,$event.toDelete).subscribe(
      x=>{ });
  }
}
