import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AcademicTitle } from '../../domain/academicTitle.domain';
import { CommonModule } from '@angular/common';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-academic-title-cmb',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  template:`
  <form [formGroup]="cmb">
  <label for="cmb">Izaberi akademsku titulu</label>
  <select formControlName="selectedOption" id="cmb">
    <option *ngFor="let option of academicTitles" [value]="option.name">{{ option.name }}</option>
  </select>
</form>
  `,
  styleUrl: './academic-title-cmb.component.scss'
})
export class AcademicTitleCmbComponent implements OnInit{
  constructor(private formBuilder : FormBuilder){}
  ngOnInit(): void {
  }
  
  @Input() academicTitles: AcademicTitle[] = [];
  
  
  
  cmb = this.formBuilder.group({
    selectedOption:"-- Select --"
  });

  @Output() selected = this.cmb.get("selectedOption")!.valueChanges.pipe(switchMap(title=>of(this.findId(title))));

  private findId(title:string | null):number | null{
    if(title == null)
    return null;
    let at = this.academicTitles.find(x=>x.name===title);
    return at!.id;
  }
}
