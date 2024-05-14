import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  CanvasJSAngularChartsModule,
} from '@canvasjs/angular-charts';
import { AcademicTitle } from '../../domain/academicTitle.domain';
import { EmployeesService } from '../../service/employees.service';
import { AcademicTitlesService } from '../../service/academicTitles.service';
import { catchError, forkJoin } from 'rxjs';

@Component({
  selector: 'app-academic-titles-pie-chart',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  template: `
    <div *ngIf="chartOptions" class="chart-container">
      <canvasjs-chart id="chart" [options]="chartOptions"></canvasjs-chart>
    </div>
  `,
  styleUrl: './academic-titles-pie-chart.component.scss',
})
export class AcademicTitlesPieChartComponent implements OnInit {
  @Input() text: string = '';
  @Input() departmentShortName: string = '';
  @Input() departmentId: number = -1;

  academicTitles: AcademicTitle[] = [];
  dataPoints?: any;
  chartOptions?: any;

  constructor(
    public employeeService: EmployeesService,
    public academicTitlesService: AcademicTitlesService,
  ) {}
  ngOnInit(): void {
    this.getAcademicTitlesAndEmployeeCounts();
  }
  getAcademicTitlesAndEmployeeCounts() {
    this.academicTitlesService
      .getAll()
      .pipe(
        catchError((x) => {
          console.log('ERR: ' + x);
          throw Error;
        })
      )
      .subscribe((titles) => {
        const observables = titles.map((academicTitle) =>
          this.employeeService
            .countEmployees(this.departmentId, academicTitle.id)
            .pipe(
              catchError((x) => {
                console.log('ERR: ' + x);
                throw Error;
              })
            )
        );
        forkJoin(observables)
          .pipe(
            catchError((x) => {
              console.log('ERR: ' + x);
              throw Error;
            })
          )
          .subscribe((counts: number[]) => {
            this.dataPoints = titles.map((academicTitle, index) =>
              ({
                label: academicTitle.name,
                y: counts[index],
              })
            );
            this.chartOptions = {
              title: {
                text: this.text,
              },
              data: [
                {
                  type: 'pie',
                  dataPoints: this.dataPoints,
                },
              ],
            };
          });
      });
  }

  changeDepartmentId(id?: number): void {
    if (!id || id == this.departmentId) {
      return;
    }
    this.departmentId = id;
    this.getAcademicTitlesAndEmployeeCounts();
    return;
  }
}
