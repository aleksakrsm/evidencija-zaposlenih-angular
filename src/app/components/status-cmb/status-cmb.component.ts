import { Component, Output } from '@angular/core';
import { Status } from '../../domain/status.enum';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-cmb',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  template: `
    <form [formGroup]="cmb">
    <label for="cmb">Status: </label>
      <select formControlName="selectedOption" id="cmb">
        <option *ngFor="let option of statuses" [value]="option">
          {{ option }}
        </option>
      </select>
    </form>
  `,
  styleUrl: './status-cmb.component.scss',
})
export class StatusCmbComponent {
  constructor(private formBuilder : FormBuilder){}

 statuses: Status[] = [Status.Active,Status.Inactive];

  cmb = this.formBuilder.group({
    selectedOption:Status.Active
  });

  @Output() selected = this.cmb.get("selectedOption")!.valueChanges;

}
