import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Subject, catchError, forkJoin } from 'rxjs';
import { AcademicTitle } from '../../domain/academicTitle.domain';
import { AcademicTitlesService } from '../../service/academicTitles.service';
import { EmployeesService } from '../../service/employees.service';

@Component({
  selector: 'app-atitles-pie-chart-js',
  standalone: true,
  imports: [NgxChartsModule, CommonModule],
  template: `
    <ngx-charts-pie-chart
      *ngIf="departmentId && dataPoints"
      [results]="dataPoints"
      [legend]="showLegend"
      [labels]="showLabels"
    >
    </ngx-charts-pie-chart>
  `,
  styleUrl: './atitles-pie-chart-js.component.scss',
})
export class ATitlesPieChartJSComponent implements OnInit,OnChanges {
  constructor(
    public employeeService: EmployeesService,
    public academicTitlesService: AcademicTitlesService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.getAcademicTitlesAndEmployeeCounts();
  }
  ngOnInit(): void {
    this.getAcademicTitlesAndEmployeeCounts();
  }
  showLegend = true;
  showLabels = true;
  academicTitles: AcademicTitle[] = [];
  dataPoints?: any;
  chartOptions?: any;

  @Input() departmentId?: number;

  getAcademicTitlesAndEmployeeCounts() {
    this.academicTitlesService
      .getAll()
      .pipe(
        catchError((x) => {
          console.log('ERR1: ' + x);
          throw Error;
        })
      )
      .subscribe((titles) => {
        const observables = titles.map((academicTitle) =>
          this.employeeService
            .countEmployees(this.departmentId? this.departmentId : -1, academicTitle.id)
            .pipe(
              catchError((x) => {
                console.log('ERR2: ' + x);
                throw Error;
              })
            )
        );
        forkJoin(observables)
          .pipe(
            catchError((x) => {
              console.log('ERR3: ' + x);
              throw Error;
            })
          )
          .subscribe((counts: number[]) => {
            this.dataPoints = titles.map((academicTitle, index) => ({
              name: academicTitle.name,
              value: counts[index],
            }));
            console.log(this.dataPoints);
          });
      });
  }

}
