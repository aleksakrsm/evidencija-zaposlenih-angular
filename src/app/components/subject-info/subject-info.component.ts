import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudiesType } from '../../domain/studiesType.enum';
import { Subject } from '../../domain/subject.domain';
import { validCmbSelection, validCmbSelectionInitial } from '../../myValidators/myCustomValidatorFunctions';

@Component({
  selector: 'app-subject-info',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  template:`
    <h3>Basic info:</h3>
<form [formGroup]="subjectForm">
  <label for="name">Name: </label>
  <input
    type="text"
    name="name"
    id="name"
    formControlName="name"
  />
  <br />
  <label for="ects">ECTS: </label>
  <input type="text" name="ects" id="ects" formControlName="ects" />
  <br />
  <label for="cmbStudiesType">Izaberi studiesType: </label>
  <select formControlName="studiesType" id="cmbStudiesType">
    <option *ngFor="let option of studiesTypes" [value]="option">
      {{ option }}
    </option>
  </select>
  <div *ngIf="subjectForm?.get('studiesType')?.errors?.['not selected']">
    u must select
  </div>
</form>
<button [disabled]="!subjectForm.valid" (click)="saveSubject()">Save</button>
  `,
  styleUrl: './subject-info.component.scss'
})
export class SubjectInfoComponent implements OnInit{
  studiesTypes: string[] = ["-- Select --",StudiesType.MASTER,StudiesType.PhD,StudiesType.SPECIALIZED,StudiesType.UNDERGRADUATE];
  @Output() subjectEmitter = new EventEmitter<Subject>();

  @Input() set subject({
    name,
    ects,
    studiesType
  }: Subject) {
    this.subjectForm.patchValue({
      name: name,
      ects: ects,
      studiesType:studiesType
    });
  }

  constructor(private formBuilder: FormBuilder) {}

  subjectForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    ects: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required,Validators.pattern("[1-9][0-9]*")],
    }),
    studiesType: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required,validCmbSelection(),validCmbSelectionInitial()],
    })
  });

  ngOnInit(): void {
    this.subjectForm.get('studiesType')?.setValue("-- Select --");
  }


  saveSubject(): void {
    let name = (
      this.subjectForm.get('name')?.getRawValue() as string
    ).trim();
    console.log(name);
    let ectsString = (
      this.subjectForm.get('ects')?.getRawValue() as string
      );
      // ).trim();
      let ects = Number.parseInt(ectsString);
      console.log(ects);
      let studiesTypeString = (
        this.subjectForm.get('studiesType')?.getRawValue() as string
        ).trim();
        let studiesType:StudiesType = StudiesType.PhD;
        switch(studiesTypeString){
          case "UNDERGRADUATE":studiesType = StudiesType.UNDERGRADUATE; break;
          case "PhD":studiesType = StudiesType.PhD; break;
          case "MASTER":studiesType = StudiesType.MASTER; break;
          case "SPECIALIZED":studiesType = StudiesType.SPECIALIZED; break;
        }
        console.log(studiesType);
        let subject: Subject = {
      name: name,
      ects: ects,
      studiesType: studiesType,
    };
    this.subjectEmitter.emit(subject);
  }
}
