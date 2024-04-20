import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeSubject } from '../../domain/employeeSubject.domain';
import { Subject } from '../../domain/subject.domain';
import { StudiesType } from '../../domain/studiesType.enum';
import { UsersService } from '../../service/users.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeSubjectService } from '../../service/subjectEmployees.service';
import { AddEmployeePopup } from '../add-employee-to-subject-popup';
import { ClassType } from '../../domain/classType.enum';
import { catchError } from 'rxjs';
import { Employee } from '../../domain/employee.domain';

@Component({
  selector: 'app-subject-employees',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h3>Employees on subject:</h3>
    <form [formGroup]="form">
      <table>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>P/V</th>
            <th>X</th>
          </tr>
        </thead>
        <tbody formArrayName="subjectEmployeesFA">
          <tr
            *ngFor="let item of subjectEmployeesFA.controls; let i = index"
            [formGroupName]="i"
          >
            <td>
              <input
                type="text"
                placeholder=""
                readonly
                formControlName="firstname"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder=""
                readonly
                formControlName="lastname"
              />
            </td>
            <td>
              <select formControlName="classType" id="cmbClassType" (blur)="classTypeSelected(i)">
                <option *ngFor="let option of classTypes" [value]="option">
                  {{ option }}
                </option>
              </select>
            </td>
            <td><button (click)="deleteItem(i)">X</button></td>
          </tr>
        </tbody>
      </table>
      <button (click)="addClicked()">Add Employee</button>
      <br />
      <button (click)="saveEmployees()">Save Empolyees</button>
    </form>
  `,
  styleUrl: './subject-employees.component.scss',
})
export class SubjectEmployeesComponent implements OnInit {
  subjectEmployees: EmployeeSubject[] = [];
  updateItems: EmployeeSubject[] = [];
  addedItems: EmployeeSubject[] = [];
  deleteItems: EmployeeSubject[] = [];
  @Output() employeesEmitter: EventEmitter<{
    toSave: EmployeeSubject[];
    toDelete: EmployeeSubject[];
  }> = new EventEmitter();
  
  @Input() subjectID?: number;
  @Input() subject!: Subject;
  // classTypes: string[] = ["-- Select --",ClassType.LECTURES,ClassType.PRACTICALS];
  classTypes: string[] = [ClassType.LECTURES,ClassType.PRACTICALS];
  
  form: FormGroup;
  constructor(
    private employeeSubjectService: EmployeeSubjectService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    public popup: MatDialog
  ) {
    this.form = this.formBuilder.group({
      subjectEmployeesFA: this.formBuilder.array([]),
    });
  }
  openPopup(): void {
    const dialogRef = this.popup.open(AddEmployeePopup, {
      width: '250px',
      id: 'chooseEmployee',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed with result:', result);
      if (result !== null && !this.subjectEmployees.find((x) => x.id.employee === result)) {
        this.addItem(result);//ovde dodajem samo primarni kljuc. jos nisam oznacio classType!!!
      }
    });
  }
  private addItem(employee: Employee) {
    // let classTypeString: string = ;

    let employeeSubject: EmployeeSubject = {
      id: { subject: this.subject, employee: employee },
      classType:ClassType.LECTURES
    };
    this.addItemToArray(employeeSubject);
    this.subjectEmployees.push(employeeSubject);
    this.addedItems.push(employeeSubject);
    console.log("dodaj");
    console.log(JSON.stringify(this.subjectEmployees,null,2));
  }
  public classTypeSelected(i:number){
    //ubaciti u added i promeniti subjectEmployees(i).classType u selektovani.
    console.log("blur");
    let item = this.subjectEmployees.at(i);
    console.log(item?.classType);
    let selected = this.subjectEmployeesFA.get(`${i}`)!.get("classType")!.getRawValue();
    console.log(selected);
    let classTSelected : ClassType = this.stringToClassType(selected);
    console.log(classTSelected);
    item!.classType = classTSelected;// ovde puca kad  ga obrisem pa dodam iznova i onda promenim
    console.log(classTSelected);
    let updateNewItem =  this.addedItems.find(x=>x.id.employee.id===item?.id.employee.id);
    // this.addedItems.find(x=>x.id.employee.id===item?.id.employee.id).classType=classTSelected;
    if(updateNewItem)updateNewItem.classType = classTSelected;
    else if(item) this.updateItems.push(item);
  }
  private stringToClassType(classTypeString: string): ClassType {
    let classType:ClassType = ClassType.LECTURES;
    switch(classTypeString){
      case "LECTURES":classType= ClassType.LECTURES;break;
      case "PRACTICALS":classType= ClassType.PRACTICALS;break;
    }
    return classType;
  }
  deleteItem(i: number): void {
    //samo iz niza i iz kontrola
    this.subjectEmployeesFA.removeAt(i); //iz kontrole
    let deletedItem: EmployeeSubject | undefined =
      this.subjectEmployees.at(i);
    // da li je vec bila u nizu titula ili je samo dodata i obrisana
    if (
      this.updateItems.find(
        (x) =>
          x.id.employee.id ===
          deletedItem?.id.employee.id
      )
    ) {
      this.updateItems = this.updateItems.filter(
        (x) =>
          x.id.employee.id !==
          deletedItem?.id.employee.id
      );
    }
    if (
      this.addedItems.find(
        (x) =>
          x.id.employee.id ===
          deletedItem?.id.employee.id
      )
    ) {
      this.addedItems = this.addedItems.filter(
        (x) =>
          x.id.employee.id !==
          deletedItem!.id.employee.id
      );
    } else {
      if (deletedItem) {
        this.deleteItems.push(deletedItem);
      }
    }
    console.log("pre brisanje");
    console.log(JSON.stringify(this.subjectEmployees,null,2));
    this.subjectEmployees.splice(i,1);
    console.log("izbrisi");
    console.log(JSON.stringify(this.subjectEmployees,null,2));
  }
  addClicked(): void {
    this.openPopup();
  }
  saveEmployees(): void {
    //proci kroz sve added i ako added ne postoji u update, dodati ga tu.
    this.addedItems.forEach((element) => {
      if (
        !this.updateItems.find(
          (x) =>
            x.id.employee.id ===
            element.id.employee.id
        )
      )
        this.updateItems.push(element);
    });
    this.employeesEmitter.emit({
      toSave: this.updateItems,
      toDelete: this.deleteItems,
    });
    window.location.reload();
  }

  get subjectEmployeesFA(): FormArray {
    return this.form.get('subjectEmployeesFA') as FormArray;
  }
  addItemToArray(item: EmployeeSubject): void {
    this.subjectEmployeesFA.push(this.createItemGroup(item));
  }
  createItemGroup(item: EmployeeSubject): FormGroup {
    return this.formBuilder.group({
      firstname: [item.id.employee.firstname],
      lastname: [item.id.employee.lastname],
      classType: [item.classType],
    });
  }
  fillTable(items: EmployeeSubject[]): void {
    items.forEach((item) => {
      this.addItemToArray(item);
    });
  }
  // previousDate: string = '';

  ngOnInit(): void {
    if (!this.subjectID) return;
    else{
      this.employeeSubjectService
        .getSubjectEmployees(
          this.subjectID,
          this.usersService.userToken.token
        )
        .pipe(
          catchError((err) => {
            console.log('PROBLEM');
            throw Error;
          })
        )
        .subscribe((x) => {
          this.subjectEmployees = x;
          console.log(JSON.stringify(x,null,2))
          this.fillTable(x);
        });
    }
  }
}
