import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Department } from '../../domain/department.domain';
import { of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../service/localStorage.service';

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
  constructor(private formBuilder: FormBuilder,private localStorageService : LocalStorageService) {}

  ngOnInit(): void {
    // console.log('helou');
    // if(this.localStorageService.get('selectedDepartmentID')){
    //   console.log('1');
    //   let depId = parseInt(this.localStorageService.get('selectedDepartmentID')!);
    //   console.log('2');
    //   console.log(depId);
    //   console.log(this.departments);
    //   let department = this.departments.find(x=>x.id == depId);
    //   console.log('3....');
    //   console.log(department!.shortName);
    //   // this.formBuilder.group({
    //     //   selectedOption:department.shortName,
    //     // });
    //     this.cmb.setValue({selectedOption:department!.shortName})
    //     console.log(4);
    // }
  }

  @Input() departments: Department[] = [];
  
  cmb = this.formBuilder.group({
    selectedOption: '-- Select --',
  });

  @Output() selected = this.cmb
    .get('selectedOption')!
    .valueChanges.pipe(switchMap((title) => of(this.findId(title))));

  private findId(title: string | null): number | undefined {
    if (title == null) return undefined;
    let at = this.departments.find((x) => x.shortName === title);
    return at!.id;
  }
}
