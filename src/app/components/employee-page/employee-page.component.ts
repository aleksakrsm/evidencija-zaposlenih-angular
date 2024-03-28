import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Employee } from '../../domain/employee.domain';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  // templateUrl: './employee-page.component.html',
  template: `
    <h3>Employees</h3>
    <div>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Firstname</td>
            <td>Lastname</td>
            <td>Academic Title</td>
            <td>Education Title</td>
            <td>Department</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let e of employees" routerLink="../employees/{{e.id}}">
            <td>{{ e.id }}</td>
            <td>{{ e.firstname }}</td>
            <td>{{ e.lastname }}</td>
            <td>{{ e.academicTitle.name }}</td>
            <td>{{ e.educationTitle.name }}</td>
            <td>{{ e.department.shortName }}</td>
            <td>{{ e.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <label for="page_size">Page size: </label>
      <input
        type="text"
        name="page_size"
        id="page_size"
        [formControl]="pageSetting"
        (blur)="pageSizeChanged()"
      />
      <div *ngIf="pageSetting.errors?.['max']">Max size is 30</div>
      <div *ngIf="pageSetting.errors?.['min']">Min size is 1</div>
      <br />
      <button (click)="previousPage()" [disabled]="currentPage === 1">
        Previous
      </button>
      Page: {{ currentPage }}
      <button (click)="nextPage()" [disabled]="currentPage === totalPages">
        Next
      </button>
    </div>
  `,
  styleUrl: './employee-page.component.scss',
})
export class EmployeePageComponent {
  pageSizeChanged() {
    //na blur
    this.pageSize = Number.parseInt(this.pageSetting.getRawValue());
    this.outputPageSize.emit(this.pageSize);
    console.log(this.pageSize);
  }
  @Input() employees: Employee[] = [];
  @Output() outputPageSize = new EventEmitter<number>();
  pageSize: number = 10;
  @Output() outputCurrentPage = new EventEmitter<number>();
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  pageSetting = new FormControl('', {
    nonNullable: true,
    validators: [Validators.min(1), Validators.max(30)],
  });

  ngOnInit(): void {
    this.pageSetting.setValue(this.pageSize + '');
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.outputCurrentPage.emit(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.outputCurrentPage.emit(this.currentPage);
    }
  }
}
