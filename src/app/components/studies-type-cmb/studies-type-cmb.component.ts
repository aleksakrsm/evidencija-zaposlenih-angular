import { Component, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StudiesType } from '../../domain/studiesType.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studies-type-cmb',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  template:`
    <form [formGroup]="cmb">
    <label for="cmb">Status: </label>
      <select formControlName="selectedOption" id="cmb">
        <option *ngFor="let option of types" [value]="option">
          {{ option }}
        </option>
      </select>
    </form>
    <br>
  `,
  styleUrl: './studies-type-cmb.component.scss'
})
export class StudiesTypeCmbComponent {
  constructor(private formBuilder : FormBuilder){}

  types: String[] = ["-- Select --",StudiesType.UNDERGRADUATE,StudiesType.MASTER,StudiesType.PhD,StudiesType.SPECIALIZED];
 
   cmb = this.formBuilder.group({
     selectedOption:"-- Select --"
   });
 
   @Output() selected = this.cmb.get("selectedOption")!.valueChanges;
 
}
