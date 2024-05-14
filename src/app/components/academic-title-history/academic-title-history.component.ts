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
import { catchError, last, throwError } from 'rxjs';
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
                readonly
                placeholder="DD.MM.YYYY"
                formControlName="beginDate"
                id="beginDate-{{ i }}"
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
    </form>
    <button (click)="addClicked()">Add New Item</button>   
    <!-- <br /> -->
    <button (click)="saveTitles()">Save Titles</button>
  `,
  styleUrl: './academic-title-history.component.scss',
})
export class AcademicTitleHistoryComponent implements OnInit {
  employeeATHistory: EmployeeAcademicTitle[] = [];
  updateItems: EmployeeAcademicTitle[] = [];
  addedItems: EmployeeAcademicTitle[] = [];
  deleteItems: EmployeeAcademicTitle[] = [];
  form: FormGroup;
  @Output() historyEmitter: EventEmitter<{
    toSave: EmployeeAcademicTitle[];
    toDelete: EmployeeAcademicTitle[];
  }> = new EventEmitter();
  @Input() employeeID?: number;
  @Input() employee!: Employee;
  @Input() academicTitles!: AcademicTitle[];
  constructor(
    private academicTitleHistoryService: AcademicTitleHistoryService,
    private formBuilder: FormBuilder,
    public dateHelper: DateHeplerService,
    public popup: MatDialog
  ) {
    this.form = this.formBuilder.group({
      historyItems: this.formBuilder.array([]),
    });
  }
  isTableComplete(): boolean {
    // if (this.employeeATHistory.length <= 1) return true;
    // if (this.employeeATHistory.at(this.employeeATHistory.length-1)?.endDate) return true;
    // return false;
    if (this.employeeATHistory.length < 1) {
      // console.log(length + " - ovo je duzina");
      return true;
    };
    if (this.employeeATHistory.at(this.employeeATHistory.length-1)?.endDate && this.employeeATHistory.at(this.employeeATHistory.length-1)?.endDate?.toString()!="Invalid Date"){
      // console.log(this.employeeATHistory.at(this.employeeATHistory.length-1)?.endDate + " - ovo je endDate");
      return true;
    };
    return false;
  }
  addClicked(): void {
    // console.log("kliknuo sam add. duzina liste titula je sledeca: "+this.employeeATHistory.length);
    this.openPopup();
  }
  openPopup(): void {
    if (!this.isTableComplete()) {
      return;
    }
    const dialogRef = this.popup.open(AddAcademicHIPopup, {
      width: '343px',
      // height:'250px',
      id: 'chooseTitle',
      disableClose: true,
      data: { academicTitles: this.academicTitles, employee: this.employee },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed with result:', result);
      if (result !== null && this.validateItemDuration(result)) {
        this.addHistoryItem(result);
      }
    });
  }
  validateItemDuration(historyItem: EmployeeAcademicTitle): boolean {
    // console.log("1");
    // console.log("pocetak validacije");
    // console.log(JSON.stringify({toSave: this.updateItems,toDelete: this.deleteItems,allItems:this.employeeATHistory},null,2));
    if (this.employeeATHistory.length < 1) return true;
    // console.log("2");
    if(!historyItem.endDate || historyItem.endDate?.toUTCString()==="Invalid Date"){
      // console.log("3");
      let lastInterval = true;
      this.employeeATHistory.forEach(element => {
        // console.log(historyItem.historyItemIdDto.beginDate);
        // console.log(this.dateHelper.getDateFromQueue(element.endDate!));
        // console.log(historyItem.historyItemIdDto.beginDate <= this.dateHelper.getDateFromQueue(element.endDate!)!);
        if(historyItem.historyItemIdDto.beginDate <= this.dateHelper.getDateFromQueue(element.endDate!)!){
          lastInterval = false;
          // return;
        }
      });
      // console.log("4");
      // if(lastInterval){
        //   return true;
        // }
        return lastInterval;
      }// posle ove linije ja znam da sigurno last interval postoji upisan i znam da nije poslenji interval
      // console.log("5");

    //proveri da li je BD u nekom intervalu
    // broveriti da li je begin date veci od najveceg end date
    let beginDateOutsideIntervals = true;
    this.employeeATHistory.forEach((element) => {
      if (
        this.dateHelper.getDateFromQueue(element.historyItemIdDto.beginDate!)! <=
          historyItem.historyItemIdDto.beginDate &&
          this.dateHelper.getDateFromQueue(element.endDate!)! >= historyItem.historyItemIdDto.beginDate
      ) {
        beginDateOutsideIntervals = false;
        // return;
      }
    });

    let endDateOutsideIntervals = true;
    // if (historyItem.endDate) {// a sta ako nemam enddate a pocetni interval je negde u sredini u supljini...
      //end date sme da fali samo ako je begin date poslednji(posle poslednjeg end data), a tad je automatski ok.
      this.employeeATHistory.forEach((element) => {
        if (
          this.dateHelper.getDateFromQueue(element.historyItemIdDto.beginDate!)! <= historyItem.endDate! &&
          this.dateHelper.getDateFromQueue(element.endDate!)! >= historyItem.endDate!
          ) {
            endDateOutsideIntervals = false;
            // return;
          }
        });
      // }
      let doesntOverlap = true;
    this.employeeATHistory.forEach((element) => {
      if (// ovde moze da pukne ako historyItem nema endDate
      this.dateHelper.getDateFromQueue(element.historyItemIdDto.beginDate!)! > historyItem.historyItemIdDto.beginDate &&
        this.dateHelper.getDateFromQueue(element.endDate!)! < historyItem.endDate!
      ) {
        doesntOverlap = false;
        // return;
      }
    });
    return doesntOverlap&&endDateOutsideIntervals&&beginDateOutsideIntervals;
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
    this.employeeATHistory.splice(i, 1);
  }
  
  saveTitles(): void {
    //proci kroz sve added i ako added ne postoji u update, dodati ga tu.
    this.addedItems.forEach((element) => {
      if (
        !this.updateItems.find(
          (x) =>
            x.historyItemIdDto ===
            element.historyItemIdDto
        )
      )
        this.updateItems.push(element);
    });
    this.historyEmitter.emit({
      toSave: this.updateItems,
      toDelete: this.deleteItems,
    });
    window.location.reload();
    // console.log(JSON.stringify({toSave: this.updateItems,toDelete: this.deleteItems}),null,2);
  }
  
  get historyItems(): FormArray {
    return this.form.get('historyItems') as FormArray;
  }
  private addHistoryItem(item: EmployeeAcademicTitle) {
    this.addItemToArray(item);
    this.employeeATHistory.push(item);
    this.addedItems.push(item);
    // console.log(JSON.stringify({toSave: this.updateItems,toDelete: this.deleteItems,allItems:this.employeeATHistory},null,2));
  }
  addItemToArray(item: EmployeeAcademicTitle): void {
    this.historyItems.push(this.createItemGroup(item));
  }
  createItemGroup(item: EmployeeAcademicTitle): FormGroup {
    // console.log(item.endDate+"^^^^^^^^^^^^^^^");
    return this.formBuilder.group({
      title: [item.historyItemIdDto.academicTitle.name],
      beginDate: [this.dateHelper.getFormatedDateStringFromQueue(item.historyItemIdDto.beginDate)],
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
    // console.log(i+" "+ this.employeeATHistory.length);
    if (i < this.employeeATHistory.length-1){
      const dateInputElement = document.getElementById(// ovo je dodatno
        `${fieldName}-${i}`
      ) as HTMLInputElement;
      dateInputElement.readOnly = true;
      return;
    }
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

    if (i < this.employeeATHistory.length-1){
      const dateInputElement = document.getElementById(
        `${fieldName}-${i}`
      ) as HTMLInputElement;
      dateInputElement.readOnly = false;
      return;
    }
    const dateInputElement = document.getElementById(
      `${fieldName}-${i}`
    ) as HTMLInputElement;
    const selectedDate = new Date(dateInputElement?.value);
    // console.log('date------' + selectedDate);
    if (!this.historyItems.get(`${i}`)?.get(`${fieldName}`)!.value) {
      this.historyItems.get(`${i}`)!.get(`${fieldName}`)!.setValue(null);
    }
    if (dateInputElement) {
      dateInputElement.type = 'text';
    }



    let itemEddited = this.employeeATHistory.at(i);
    // console.log(">>>>>>>>>1>>>>>>>>>>>>");
    if (!itemEddited) throwError(Error);
    else {
      // console.log(">>>>>>>>>2>>>>>>>>>>>>");
      if (fieldName === 'beginDate') {
        // console.log(">>>>>>>>>3>>>>>>>>>>>>");
        itemEddited.historyItemIdDto.beginDate = selectedDate;
      } else {// endDate
        // console.log(">>>>>>>>>4>>>>>>>>>>>>");
        if(this.dateHelper.getDateFromQueue(itemEddited.historyItemIdDto.beginDate)!<selectedDate){// ED>BD

          // console.log(">>>>>>>>>5>>>>>>>>>>>>");
          // samo ako je 
          itemEddited.endDate = selectedDate;
        }
      }
    }
    // console.log("-----------------");
    if (selectedDate.toUTCString() === 'Invalid Date'){
      // console.log("----------1-------");
    dateInputElement.value = 'DD.MM.YYYY';

    }
    else{
    // console.log("----------2-------");
    // console.log(selectedDate);
    // console.log(this.dateHelper.getDateFromQueue(itemEddited?.historyItemIdDto.beginDate!)!);
    if(selectedDate<this.dateHelper.getDateFromQueue(itemEddited?.historyItemIdDto.beginDate!)!){
        // console.log("----------3-------");
        dateInputElement.value = this.previousDate;
      }
      else{
        // console.log("----------4-------");
        dateInputElement.value = this.dateHelper.formatDateToString(selectedDate);
      }
    }
    if (
      this.previousDate !== dateInputElement.value &&
      !(this.previousDate === '' && dateInputElement.value === 'DD.MM.YYYY')
    ) {
      // console.log('==1==' + this.previousDate);
      // console.log('===2===' + dateInputElement.value);
      if(dateInputElement.value === 'DD.MM.YYYY') {
        if(this.isLastInterval(itemEddited!)){
          itemEddited!.endDate =undefined;
        }
        else{
          dateInputElement.value = this.previousDate;
          return;
        }
      }
      if (!itemEddited) throwError(Error);
      else this.updateItems.push(itemEddited); // sta ako sam dodao item kao new (added lista), a sta ako sam neki postojeci izmenio, pa posle obrisao???
    }
    // console.log('Update items: ');
    // console.log(JSON.stringify(this.updateItems,null,2));
  }
  isLastInterval(item:EmployeeAcademicTitle):boolean{
    let isLast=true;
    // console.log("islast:   "+item.historyItemIdDto.beginDate);
    this.employeeATHistory.forEach(element => {
      if(this.dateHelper.getDateFromQueue(element.historyItemIdDto.beginDate)!>item.historyItemIdDto.beginDate){
        isLast = false;
      }
    });
    return isLast;
  }
  ngOnInit(): void {
    if (!this.employeeID) return;
    else
      this.academicTitleHistoryService
        .getEmployeeAcademicTitleHistory(this.employeeID)
        .pipe(
          catchError((err) => {
            // console.log('PROBLEM');
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
