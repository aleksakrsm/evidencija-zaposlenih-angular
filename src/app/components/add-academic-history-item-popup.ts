import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AcademicTitle } from '../domain/academicTitle.domain';
import { validCmbSelection, validDateTxtSelection } from '../myValidators/myCustomValidatorFunctions';
import { DateHeplerService } from '../service/dateHelper.service';
import { EmployeeAcademicTitle } from '../domain/employeeAcademicTitle.domain';
import { Employee } from '../domain/employee.domain';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-academic-hi',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="popup">

    <h3>Add New History Item</h3>
    
    <form [formGroup]="historyItem" >
      <label for="cmbAT">Izaberi akademsku titulu</label>
      <select formControlName="academicTitle" id="cmbAT">
        <option *ngFor="let option of academicTitles" [value]="option.name">
          {{ option.name }}
        </option>
      </select>
      <div *ngIf="historyItem?.get('academicTitle')?.errors?.['not selected']">
        u must select
      </div>
      <br>
      <label for="beginDate">Izaberi BeginDate</label><br>
      <input
      type="text"
      placeholder="DD.MM.YYYY"
      formControlName="beginDate"
      id="beginDate"
      (focus)="onDateFocus('beginDate')"
      (blur)="onDateBlur('beginDate')"
      />
      <br />
      <label for="endDate">Izaberi EndDate</label><br>
      <input
      type="text"
      placeholder="DD.MM.YYYY"
      formControlName="endDate"
      id="endDate"
      (focus)="onDateFocus('endDate')"
      (blur)="onDateBlur('endDate')"
      />
      <br />
    </form>
    <button [disabled]="!historyItem.valid" (click)="add()">Add</button>
    <button (click)="close()">Close</button>
  </div>
    `,
  styles: [],
})
export class AddAcademicHIPopup {
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddAcademicHIPopup>,
    private dateHelper: DateHeplerService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.academicTitles = data.academicTitles;
      this.employee = data.employee;
    }
  employee: Employee;
  academicTitles: AcademicTitle[];
  historyItem: FormGroup = this.formBuilder.group({
    academicTitle: this.formBuilder.control('-- Select --', {
      validators: [validCmbSelection()],
    }),
    beginDate: this.formBuilder.control('DD.MM.YYYY', { validators: [validDateTxtSelection()] }),
    endDate: this.formBuilder.control('DD.MM.YYYY', { validators: [] }),
  });
  beginDate?: Date;
  endDate?: Date;
  academicTitle?: AcademicTitle;
  close(): void {
    this.dialogRef.close(null);
  }
  add(): void {
    let newHistoryItem: EmployeeAcademicTitle;
    this.academicTitle = this.findAT(
      this.historyItem?.get(`academicTitle`)!.getRawValue()
      );
      // console.log(this.academicTitle);
      // if(This)
      if (this.academicTitle && this.beginDate) {
        newHistoryItem = {
          historyItemIdDto: {
            academicTitle: this.academicTitle,
            beginDate: this.beginDate,
            employee:this.employee
          }
        };
      }
      else return;
      
      if(this.endDate && this.endDate.toUTCString()!="Invalid Date"){
        if(this.endDate>this.beginDate){
          newHistoryItem.endDate = this.endDate;
        }else{
          this.dialogRef.close(null);
          return;
        }
      }
      
      this.dialogRef.close(newHistoryItem);
    }
  // previousDate: string = '';
  onDateFocus(fieldName: string) {
    const dateInputElement = document.getElementById(
      `${fieldName}`
      ) as HTMLInputElement;
      const formattedDate = dateInputElement.value;
      const convertedDate = this.dateHelper.formatedStringToDate(formattedDate);
      if (dateInputElement) {
        dateInputElement.type = 'date';
      }
      dateInputElement.valueAsDate = convertedDate;
    }
    onDateBlur(fieldName: string) {
      const dateInputElement = document.getElementById(
      `${fieldName}`
    ) as HTMLInputElement;
    const selectedDate = new Date(dateInputElement?.value);
    console.log('date------' + selectedDate);
    if (!this.historyItem?.get(`${fieldName}`)!.value) {
      this.historyItem!.get(`${fieldName}`)!.setValue(null);
    }
    if (dateInputElement) {
      dateInputElement.type = 'text';
    }
    if (fieldName === 'beginDate') {
      this.beginDate = selectedDate;
    } else {
      this.endDate = selectedDate;
    }
    if (selectedDate.toUTCString() == 'Invalid Date')
    dateInputElement.value = 'DD.MM.YYYY';
  else
  dateInputElement.value = this.dateHelper.formatDateToString(selectedDate);
}
private findAT(title: string): AcademicTitle {
  let at = this.academicTitles.find((x) => x.name === title);
  let titleR: AcademicTitle = { id: -1, name: '' };
  if (!at) throwError(Error);
  else titleR = at;
  return titleR;
}
}
