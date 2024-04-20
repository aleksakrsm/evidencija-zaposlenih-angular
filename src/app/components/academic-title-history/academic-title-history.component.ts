import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { EmployeeAcademicTitle } from '../../domain/employeeAcademicTitle.domain';
import { AcademicTitleHistoryService } from '../../service/academicTitleHistory.service';
import { UsersService } from '../../service/users.service';
import { DateHeplerService } from '../../service/dateHelper.service';
import { catchError, throwError } from 'rxjs';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { AddAcademicHIPopup } from '../add-academic-history-item-popup';
import { AcademicTitle } from '../../domain/academicTitle.domain';
import { Employee } from '../../domain/employee.domain';

@Component({
  selector: 'app-academic-title-history',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  template: `
    <h3>Academic title history:</h3>
    <form [formGroup]="form">
      <table>
        <thead>
          <tr>
            <th>Academic Title</th>
            <th>Start date</th>
            <th>End date</th>
            <th>X</th>
          </tr>
        </thead>
        <tbody formArrayName="historyItems">
          <tr
            *ngFor="let item of historyItems.controls; let i = index"
            [formGroupName]="i"
          >
            <td>
              <input
                type="text"
                placeholder=""
                readonly
                formControlName="title"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="DD.MM.YYYY"
                formControlName="beginDate"
                id="beginDate-{{ i }}"
                (focus)="onDateFocus(i, 'beginDate')"
                (blur)="onDateBlur(i, 'beginDate')"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="DD.MM.YYYY"
                formControlName="endDate"
                id="endDate-{{ i }}"
                (focus)="onDateFocus(i, 'endDate')"
                (blur)="onDateBlur(i, 'endDate')"
              />
            </td>
            <td><button (click)="deleteItem(i)">X</button></td>
          </tr>
        </tbody>
      </table>
      <button (click)="addClicked()">Add New Item</button>
      <br />
      <button (click)="saveTitles()">Save Titles</button>
    </form>
  `,
  styleUrl: './academic-title-history.component.scss',
})
export class AcademicTitleHistoryComponent implements OnInit {
  employeeATHistory: EmployeeAcademicTitle[] = [];
  updateItems: EmployeeAcademicTitle[] = [];
  addedItems: EmployeeAcademicTitle[] = [];
  deleteItems: EmployeeAcademicTitle[] = [];
  @Output() historyEmitter: EventEmitter<{
    toSave: EmployeeAcademicTitle[];
    toDelete: EmployeeAcademicTitle[];
  }> = new EventEmitter();
  // @Output() historyEmitter:EventEmitter<EmployeeAcademicTitle[]>  = new EventEmitter();
  // @Output() deleteHistoryEmitter:EventEmitter<EmployeeAcademicTitle[]>  = new EventEmitter();
  @Input() employeeID?: number;
  @Input() employee!: Employee;
  @Input() academicTitles!: AcademicTitle[];
  form: FormGroup;
  constructor(
    private academicTitleHistoryService: AcademicTitleHistoryService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    public dateHelper: DateHeplerService,
    public popup: MatDialog
  ) {
    this.form = this.formBuilder.group({
      historyItems: this.formBuilder.array([]),
    });
  }
  openPopup(): void {
    const dialogRef = this.popup.open(AddAcademicHIPopup, {
      width: '250px',
      id: 'chooseTitle',
      // hasBackdrop: true,
      // ariaModal: true,
      disableClose: true,
      data: { academicTitles: this.academicTitles },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed with result:', result);
      if (
        result !== '-- Select --' &&
        !this.employeeATHistory.find(
          (x) => x.historyItemIdDto.academicTitle.name === result
        )
      ) {
        this.addItem(this.findAT(result));
      }
    });
  }
  deleteItem(i: number): void {
    //samo iz niza i iz kontrola
    this.historyItems.removeAt(i); //iz kontrole
    let deletedItem: EmployeeAcademicTitle | undefined =
      this.employeeATHistory.at(i);
    // da li je vec bila u nizu titula ili je samo dodata i obrisana
    if (
      this.updateItems.find(
        (x) =>
          x.historyItemIdDto.academicTitle.id ===
          deletedItem?.historyItemIdDto.academicTitle.id
      )
    ) {
      this.updateItems = this.updateItems.filter(
        (x) =>
          x.historyItemIdDto.academicTitle.id !==
          deletedItem?.historyItemIdDto.academicTitle.id
      );
    }
    if (
      this.addedItems.find(
        (x) =>
          x.historyItemIdDto.academicTitle.id ===
          deletedItem?.historyItemIdDto.academicTitle.id
      )
    ) {
      this.addedItems = this.addedItems.filter(
        (x) =>
          x.historyItemIdDto.academicTitle.id !==
          deletedItem?.historyItemIdDto.academicTitle.id
      );
    } else {
      if (deletedItem) {
        this.deleteItems.push(deletedItem);
      }
    }
    this.employeeATHistory.splice(i,1);
  }
  addClicked(): void {
    this.openPopup();
  }
  saveTitles(): void {
    //proci kroz sve added i ako added ne postoji u update, dodati ga tu.
    this.addedItems.forEach((element) => {
      if (
        !this.updateItems.find(
          (x) =>
            x.historyItemIdDto.academicTitle.id ===
            element.historyItemIdDto.academicTitle.id
        )
      )
        this.updateItems.push(element);
    });
    this.historyEmitter.emit({
      toSave: this.updateItems,
      toDelete: this.deleteItems,
    });
    window.location.reload();
  }
  private addItem(at: AcademicTitle) {
    let employeeAcademicTitle: EmployeeAcademicTitle = {
      historyItemIdDto: { academicTitle: at, employee: this.employee },
    };
    this.addItemToArray(employeeAcademicTitle);
    this.employeeATHistory.push(employeeAcademicTitle);
    this.addedItems.push(employeeAcademicTitle);
  }
  private findAT(title: string): AcademicTitle {
    let at = this.academicTitles.find((x) => x.name === title);
    let titleR: AcademicTitle = { id: -1, name: '' };
    if (!at) throwError(Error);
    else titleR = at;
    return titleR;
  }

  get historyItems(): FormArray {
    return this.form.get('historyItems') as FormArray;
  }
  addItemToArray(item: EmployeeAcademicTitle): void {
    this.historyItems.push(this.createItemGroup(item));
  }
  createItemGroup(item: EmployeeAcademicTitle): FormGroup {
    return this.formBuilder.group({
      title: [item.historyItemIdDto.academicTitle.name],
      beginDate: [
        this.dateHelper.getFormatedDateStringFromQueue(item.beginDate),
      ],
      endDate: [this.dateHelper.getFormatedDateStringFromQueue(item.endDate)],
    });
  }
  fillTable(items: EmployeeAcademicTitle[]): void {
    items.forEach((item) => {
      this.addItemToArray(item);
    });
  }
  previousDate: string = '';

  onDateFocus(i: number, fieldName: string) {
    const dateInputElement = document.getElementById(
      `${fieldName}-${i}`
    ) as HTMLInputElement;
    const formattedDate = dateInputElement.value;
    this.previousDate = formattedDate;
    const convertedDate = this.dateHelper.formatedStringToDate(formattedDate);
    if (dateInputElement) {
      dateInputElement.type = 'date';
    }
    dateInputElement.valueAsDate = convertedDate;
  }
  onDateBlur(i: number, fieldName: string) {
    const dateInputElement = document.getElementById(
      `${fieldName}-${i}`
    ) as HTMLInputElement;
    const selectedDate = new Date(dateInputElement?.value);
    console.log('date------' + selectedDate);
    if (!this.historyItems.get(`${i}`)?.get(`${fieldName}`)!.value) {
      this.historyItems.get(`${i}`)!.get(`${fieldName}`)!.setValue(null);
    }
    if (dateInputElement) {
      dateInputElement.type = 'text';
    }
    let newItem: EmployeeAcademicTitle = {
      historyItemIdDto: {
        academicTitle: { id: -1, name: '' },
        employee: this.employee,
      },
    };
    if (fieldName === 'beginDate') {
      let itemN = this.employeeATHistory.at(i);
      if (!itemN) {
        throwError(Error);
      } else {
        newItem = {
          historyItemIdDto: itemN.historyItemIdDto,
          beginDate: selectedDate,
          endDate: itemN.endDate,
        };
      }
    } else {
      let itemN = this.employeeATHistory.at(i);
      if (!itemN) {
        throwError(Error);
      } else {
        newItem = {
          historyItemIdDto: itemN.historyItemIdDto,
          beginDate: itemN.beginDate,
          endDate: selectedDate,
        };
      }
    }
    if (selectedDate.toUTCString() === 'Invalid Date')
      dateInputElement.value = 'DD.MM.YYYY';
    else
      dateInputElement.value = this.dateHelper.formatDateToString(selectedDate);
    if (this.previousDate !== dateInputElement.value && !(this.previousDate===''&& dateInputElement.value==='DD.MM.YYYY')) {
      console.log('==1=='+this.previousDate);
      console.log('===2==='+dateInputElement.value);
      this.updateItems.push(newItem); // sta ako sam dodao item kao new (added lista), a sta ako sam neki postojeci izmenio, pa posle obrisao???
    }
  }

  ngOnInit(): void {
    if (!this.employeeID) return;
    else
      this.academicTitleHistoryService
        .getEmployeeAcademicTitleHistory(
          this.employeeID,
          this.usersService.userToken.token
        )
        .pipe(
          catchError((err) => {
            console.log('PROBLEM');
            throw Error;
          })
        )
        .subscribe((x) => {
          this.employeeATHistory = x;
          // console.log(JSON.stringify(x,null,2))
          this.fillTable(x);
        });
  }
}
