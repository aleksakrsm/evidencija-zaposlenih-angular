import { Component, EventEmitter, Output } from '@angular/core';
import { StudiesTypeCmbComponent } from '../studies-type-cmb/studies-type-cmb.component';
import { StudiesType } from '../../domain/studiesType.enum';
@Component({
  selector: 'app-subjects-filter',
  standalone: true,
  imports: [StudiesTypeCmbComponent],
  template:`
    <br>
  <app-studies-type-cmb (selected)="notifyStudiesType($event)"></app-studies-type-cmb>
  `,
  styleUrl: './subjects-filter.component.scss'
})
export class SubjectsFilterComponent {

  @Output() filterChanged = new EventEmitter<string>();

  notifyStudiesType($event: string | null) {
    let selectedType:string = "";
    if($event!==null){
      selectedType = $event;
    }
    this.filterChanged.emit(selectedType);
  }
}
