import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EducationTitle } from '../../domain/educationTitle.domain';
import { of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education-title-cmb',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  template:`
  <form [formGroup]="cmb">
    <label for="cmb">Education title: </label>
  <select formControlName="selectedOption"  id="cmb">
    <option *ngFor="let option of educationTitles" [value]="option.name">{{ option.name }}</option>
  </select>
</form>
  `,
  styleUrl: './education-title-cmb.component.scss'
})
export class EducationTitleCmbComponent implements OnInit{
  constructor(private formBuilder : FormBuilder){}

  ngOnInit(): void {
  }

  @Input() educationTitles: EducationTitle[] = [];

  cmb = this.formBuilder.group({
    selectedOption:"-- Select --"
  });

  @Output() selected = this.cmb.get("selectedOption")!.valueChanges.pipe(switchMap(title=>of(this.findId(title))));

  private findId(title:string | null):number | null{
    if(title == null)
    return null;
    let at = this.educationTitles.find(x=>x.name===title);
    return at!.id;
  }
}
