import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AcademicTitle } from '../domain/academicTitle.domain';
import { validCmbSelection } from '../myValidators/myCustomValidatorFunctions';

@Component({
  selector: 'app-add-academic-hi',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template:`
    <h3>Add New History Item</h3>

    <label for="cmbAT">Izaberi akademsku titulu</label>
  <select [formControl]="academicTitle" id="cmbAT">
  <!-- <select formControlName="academicTitle" id="cmbAT"> -->
    <option *ngFor="let option of academicTitles" [value]="option.name">
      {{ option.name }}
    </option>
  </select>
  <div *ngIf="academicTitle?.errors?.['not selected']">
    u must select
  </div>

    <button [disabled]="!academicTitle.valid" (click)="add()">Add</button>
    <button (click)="close()">Close</button>
  `,
  styles:[

  ]
})
export class AddAcademicHIPopup {
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddAcademicHIPopup>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.academicTitles = data.academicTitles;
    }
    academicTitles: AcademicTitle[];
  academicTitle:FormControl = this.formBuilder.control('-- Select --',{validators:[validCmbSelection()]});
  close(): void {
    this.dialogRef.close('-- Select --');
  }
  add(): void {
    this.dialogRef.close(this.academicTitle.getRawValue());
  }
}