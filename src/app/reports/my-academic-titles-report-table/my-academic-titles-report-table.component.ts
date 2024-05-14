import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AcademicTitle } from '../../domain/academicTitle.domain';
import { EmployeesService } from '../../service/employees.service';
import { AcademicTitlesService } from '../../service/academicTitles.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-academic-titles-report-table',
  standalone: true,
  imports: [CommonModule],
  template:`
  <table id="mytable">
  <thead>
    <tr>
      <th>Academic Title</th>
      <th>Number</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let item of dataPoints">
      <td>{{ item.label }}</td>
      <td>{{ item.y }}</td>
    </tr>
  </tbody>
</table>
  `,
  styleUrl: './my-academic-titles-report-table.component.scss'
})
export class MyAcademicTitlesReportTableComponent {
  constructor(public employeeService: EmployeesService,public academicTitlesService: AcademicTitlesService,private cdr: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.getAcademicTitlesAndEmployeeCounts();
  }
  @Input() departmentId: number = -1;
  changeDepartmentId(id?:number):void{
    if(!id || id==this.departmentId){
      return;
    }
    this.departmentId = id;
    this.getAcademicTitlesAndEmployeeCounts();

    return;
  }
  academicTitles: AcademicTitle[] = [];
  dataPoints?: any;
  getAcademicTitlesAndEmployeeCounts() {
    this.academicTitlesService.getAll().subscribe(titles => {
      const observables = titles.map(academicTitle =>
        this.employeeService.countEmployees(this.departmentId!, academicTitle.id)
      );

      forkJoin(observables).subscribe((counts: number[]) => {
        this.dataPoints = titles.map((academicTitle, index) => ({
          label: academicTitle.name,
          y: counts[index]
        }));
      });
    });
    
    this.cdr.detectChanges();
  }
}
