import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Department } from '../../domain/department.domain';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-info',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  template: `
    <h3>Basic info:</h3>
    <form [formGroup]="departmentForm">
      <label for="name">Name: </label>
      <input type="text" name="name" id="name" formControlName="name" />
      <br />
      <label for="shortName">Short Name: </label>
      <input type="text" name="shortName" id="shortName" formControlName="shortName" />
      <br />
    </form>
    <button [disabled]="!departmentForm.valid" (click)="saveDepartment()">
      Save
    </button>
  `,
  styleUrl: './department-info.component.scss',
})
export class DepartmentInfoComponent implements OnInit {
  @Output() departmentEmitter = new EventEmitter<Department>();

  @Input() set department({ name, shortName }: Department) {
    this.departmentForm.patchValue({
      name: name,
      shortName: shortName
    });
  }

  constructor(private formBuilder: FormBuilder) {}

  departmentForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    shortName: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {}

  saveDepartment(): void {
    let name = (
      this.departmentForm.get('name')?.getRawValue() as string
    ).trim();
    console.log(name);
    let shortName = (
      this.departmentForm.get('shortName')?.getRawValue() as string
    ).trim();
    console.log(shortName);

    let department: Department = {
      name: name,
      shortName: shortName
    };
    this.departmentEmitter.emit(department);
  }
}
