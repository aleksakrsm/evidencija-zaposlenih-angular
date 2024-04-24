import { Component } from '@angular/core';
import { SubjectInfoComponent } from '../../components/subject-info/subject-info.component';
import { Subject } from '../../domain/subject.domain';
import { SubjectsService } from '../../service/subjects.service';
import { UsersService } from '../../service/users.service';
import { ActivatedRoute } from '@angular/router';
import { StudiesType } from '../../domain/studiesType.enum';
import { SubjectEmployeesComponent } from '../../components/subject-employees/subject-employees.component';
import { EmployeeSubject } from '../../domain/employeeSubject.domain';
import { EmployeeSubjectService } from '../../service/subjectEmployees.service';

@Component({
  selector: 'app-edit-subject',
  standalone: true,
  imports: [SubjectInfoComponent,SubjectEmployeesComponent],
  template:`
    <app-subject-info
      (subjectEmitter)="updateSubject($event)"
      [subject]="subject"
    ></app-subject-info>
    <app-subject-employees [subjectID]="id" [subject]="subject" (employeesEmitter)="saveLecturers($event)"></app-subject-employees>
  `,
  styleUrl: './edit-subject.component.scss'
})
export class EditSubjectComponent {
  id!: number;
  subject: Subject = {
    name: '',
    ects:0,
    studiesType: StudiesType.UNDERGRADUATE,
  };
  
  constructor(
    private subjectsService: SubjectsService,
    // private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private subjectEmployeesService:EmployeeSubjectService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
    });
    this.subjectsService
      .getSubject(this.id)
      .subscribe((x) => (this.subject = x));
  }
  updateSubject($event: Subject) {
    // ovo izmeniti jer vraca novi emp umesto da update stari
    $event.id = this.id;
    this.subjectsService
      .updateSubject($event)
      .pipe()
      .subscribe((x) => {
        console.log('============ID:====updated=========');
        console.log(x.id);
        // this.location.back();
      });
  }
  saveLecturers($event:{toSave:EmployeeSubject[],toDelete:EmployeeSubject[]}) {
    // this.historyService.saveEmployeeAcademicTitleHistory(history,this.usersService.userToken.token).subscribe();
    if($event.toSave.length==0&&$event.toDelete.length==0)
      return;
    this.subjectEmployeesService.saveSubjectEmployees($event.toSave,$event.toDelete).subscribe();
  }
}
