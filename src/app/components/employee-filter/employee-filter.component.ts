import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AcademicTitleCmbComponent } from '../academic-title-cmb/academic-title-cmb.component';
import { AcademicTitle } from '../../domain/academicTitle.domain';
import { EducationTitleCmbComponent } from '../education-title-cmb/education-title-cmb.component';
import { EducationTitle } from '../../domain/educationTitle.domain';
import { Department } from '../../domain/department.domain';
import { DepartmentCmbComponent } from '../department-cmb/department-cmb.component';
import { StatusCmbComponent } from "../status-cmb/status-cmb.component";
import { EmployeeFilter } from '../../domain/employeeFilter';
import { Status } from '../../domain/status.enum';

@Component({
    selector: 'app-employee-filter',
    standalone: true,
    template: `
  <app-academic-title-cmb [academicTitles] = "academicTitles" (selected)="notifyAT($event)"></app-academic-title-cmb>
  <!-- <app-academic-title-cmb [academicTitles] = "academicTitles" (selected)="print($event)"></app-academic-title-cmb> -->
  <br>
  <app-education-title-cmb [educationTitles] = "educationTitles" (selected)="notifyET($event)"></app-education-title-cmb>
  <br>
  <app-department-cmb [departments] = "departments" (selected)="notifyDepartment($event)"></app-department-cmb>
  <br>
  <app-status-cmb  (selected)="notifyStatus($event)"></app-status-cmb>

  `,
    styleUrl: './employee-filter.component.scss',
    imports: [AcademicTitleCmbComponent, EducationTitleCmbComponent, DepartmentCmbComponent, StatusCmbComponent]
})
export class EmployeeFilterComponent {

  @Input() academicTitles : AcademicTitle[]=[] 
  @Input() educationTitles : EducationTitle[]=[] 
  @Input() departments : Department[]=[] 

  @Output() filterChanged = new EventEmitter<EmployeeFilter>();
  employeeFilter:EmployeeFilter = {academicTitleId:-1,departmentId:-1,educationTitleId:-1,status:Status.Active};

notifyAT($event: number | null) {
  if($event==null){
    this.employeeFilter.academicTitleId = -1;
  }else{
    this.employeeFilter.academicTitleId = $event;
  }
  this.filterChanged.emit(this.employeeFilter);
}
notifyET($event: number | null) {
  if($event==null){
    this.employeeFilter.educationTitleId = -1;
  }else{
    this.employeeFilter.educationTitleId = $event;
  }
  this.filterChanged.emit(this.employeeFilter);
}
notifyDepartment($event: number | null) {
  if($event==null){
    this.employeeFilter.departmentId = -1;
  }else{
    this.employeeFilter.departmentId = $event;
  }
  this.filterChanged.emit(this.employeeFilter);
}
notifyStatus($event: string | null) {
  if($event==null){
    this.employeeFilter.status = Status.Active;
  }else{
    if($event == Status.Active){
      this.employeeFilter.status = Status.Active;
    }else{
      this.employeeFilter.status = Status.Inactive;
    }
  }
  this.filterChanged.emit(this.employeeFilter);
}




print($event: number | null) {
  console.log("select:    "+$event);
}
printStatus($event: string | null) {
  console.log("select:    "+$event);
}


}

