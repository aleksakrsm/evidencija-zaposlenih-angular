import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject } from '../../domain/subject.domain';

@Component({
  selector: 'app-subjects-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  template:`
    <h3>Subjects</h3>
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>ECTS</th>
            <th>Studies Type</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let e of subjects" routerLink="../subjects/{{e.id}}">
            <td>{{ e.id }}</td>
            <td>{{ e.name }}</td>
            <td>{{ e.ects }}</td>
            <td>{{ e.studiesType }}</td>
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
  styles:[]
})
export class SubjectsPageComponent {
  pageSizeChanged() {
    //na blur
    this.pageSize = Number.parseInt(this.pageSetting.getRawValue());
    this.outputPageSize.emit(this.pageSize);
    console.log(this.pageSize);
  }
  @Input() subjects: Subject[] = [];
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
