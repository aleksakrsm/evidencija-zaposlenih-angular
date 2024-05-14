import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AcademicTitlesPieChartComponent } from '../../reports/academic-titles-pie-chart/academic-titles-pie-chart.component';
import { AcademicTitle } from '../../domain/academicTitle.domain';
import { EmployeesService } from '../../service/employees.service';
import { AcademicTitlesService } from '../../service/academicTitles.service';
import { DepartmentCmbComponent } from '../../components/department-cmb/department-cmb.component';
import { DepartmentsService } from '../../service/departments.service';
import { Department } from '../../domain/department.domain';
import { MyAcademicTitlesReportTableComponent } from '../../reports/my-academic-titles-report-table/my-academic-titles-report-table.component';
import { LocalStorageService } from '../../service/localStorage.service';
import { Subscription } from 'rxjs';
import { ATitlesPieChartJSComponent } from '../../reports/atitles-pie-chart-js/atitles-pie-chart-js.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    AcademicTitlesPieChartComponent,
    DepartmentCmbComponent,
    MyAcademicTitlesReportTableComponent,
    ATitlesPieChartJSComponent
  ],
  template: `
    <mat-tab-group
      (selectedTabChange)="onTabChanged($event)"
      [selectedIndex]="selectedIndex"
    >
      <mat-tab label="Report 1"
        ><app-academic-titles-pie-chart
          [text]="'Faculty Level Academic Titles'"
        ></app-academic-titles-pie-chart
      ></mat-tab>
      <mat-tab label="Report 2">
        <app-department-cmb
        [departments]="departments"
        (selected)="departmentSelection($event)"
        ></app-department-cmb>
        <br />
          <app-atitles-pie-chart-js [departmentId]="departmentId"></app-atitles-pie-chart-js>
      </mat-tab>
    </mat-tab-group>
  `,
  styleUrl: './reports.component.scss',
  animations: [
    trigger('translateTab', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class ReportsComponent implements OnInit {
  departmentId?: number;
  selectedIndex?: number = 0;
  departments!: Department[];
  department?: Department;
  text:string = `Department Level Academic Titles For: ${this.department?.shortName}` 
  departmentSelected: EventEmitter<number> = new EventEmitter();
  
  private departmentsSubscription: Subscription | undefined;
  constructor(
    private departmentsService: DepartmentsService,
    private localStorageService: LocalStorageService
  ) {}
  shouldIReload: boolean = false;
  private reload() {
    if (this.shouldIReload) {
      this.shouldIReload = false;
      window.location.reload();
    }
  }
  ngOnInit(): void {
    let depId: number;
    this.departmentsSubscription = this.departmentsService
      .getAll()
      .subscribe((x) => {
        this.departments = x;
        this.department = this.departments.find(x=>x.id===depId);
      });
  }
  onTabChanged(event: MatTabChangeEvent) {
    this.selectedIndex = event.index;
    console.log('Selected tab index:', event.index);
  }

  departmentSelection(departmentId: number | undefined) {
    if (!departmentId) return;
    this.departmentId = departmentId;
  }
}
