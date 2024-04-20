import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeesService } from '../service/employees.service';
import { UsersService } from '../service/users.service';
import { Employee } from '../domain/employee.domain';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-add-academic-hi',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,AsyncPipe],
  template: `
    <h3>Add Employee</h3>

    <label for="employeeSearch">Pretrazi employee</label>
    <input
      type="text"
      name="employeeSearch"
      id="employeeSearch"
      [formControl]="searchTerm"
      (keyup)="onKeyUp()"
    />
    <!-- <div *ngIf="searchResults"> -->
      <ul>
        <!-- na klik se zatvara i vraca kliknutog employeeaili njegov id -->
        <li *ngFor="let employee of searchResults$ | async" (click)="add(employee)">
          {{ employee.firstname }} {{ employee.lastname }}
          {{ employee.department.shortName }}
        </li>
      </ul>
    <!-- </div> -->
    <!-- <div *ngIf="academicTitle?.errors?.['not selected']">
    u must select
  </div> -->

    <!-- <button [disabled]="!academicTitle.valid" (click)="add()">Add</button> -->
    <button (click)="close()">Close</button>
  `,
  styles: [],
})
export class AddEmployeePopup {
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEmployeePopup>,
    public employeeService: EmployeesService,
    public usersService: UsersService
  ) {}
  // searchResults: Employee[] = [];
  searchResults$!: Observable<Employee[]>;
  private searchText$ = new Subject<string>();
  search(term: string) {
    this.searchText$.next(term);
  }
  ngOnInit() {
    this.searchResults$ = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term) =>
        this.employeeService.searchEmployee(
          term,
          this.usersService.userToken.token
        )
      )
    );
  }
  searchTerm: FormControl = this.formBuilder.control('', { validators: [] });
  onKeyUp(): void {
    let searchTerm: string = this.searchTerm.getRawValue();
    searchTerm = searchTerm.trim();
    if (searchTerm === '') return;
    this.search(searchTerm);
  }
  close(): void {
    this.dialogRef.close(null);
  }
  add(employee: Employee): void {
    this.dialogRef.close(employee);
  }
}
