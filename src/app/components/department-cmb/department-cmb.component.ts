import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Department } from '../../domain/department.domain';
import { of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-cmb',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  template: `
    <form [formGroup]="cmb">
    <label for="cmb">Department: </label>
      <select formControlName="selectedOption" id="cmb">
        <option *ngFor="let option of departments" [value]="option.shortName">
          {{ option.shortName }}
        </option>
      </select>
    </form>
  `,
  styleUrl: './department-cmb.component.scss',
})
export class DepartmentCmbComponent implements OnInit{
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  @Input() departments: Department[] = [];

  cmb = this.formBuilder.group({
    selectedOption: '-- Select --',
  });

  @Output() selected = this.cmb
    .get('selectedOption')!
    .valueChanges.pipe(switchMap((title) => of(this.findId(title))));

  private findId(title: string | null): number | null {
    if (title == null) return null;
    let at = this.departments.find((x) => x.shortName === title);
    return at!.id;
  }
}
