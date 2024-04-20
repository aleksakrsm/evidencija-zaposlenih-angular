import { Component, OnInit } from '@angular/core';
import { SubjectInfoComponent } from '../../components/subject-info/subject-info.component';
import { SubjectsService } from '../../service/subjects.service';
import { UsersService } from '../../service/users.service';
import { Subject } from '../../domain/subject.domain';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-subject',
  standalone: true,
  imports: [SubjectInfoComponent],
  template: `
    <app-subject-info
      (subjectEmitter)="saveSubject($event)"
    ></app-subject-info>
  `,
  styleUrl: './add-subject.component.scss',
})
export class AddSubjectComponent implements OnInit{
  constructor(
    private location: Location,
    private subjectsService: SubjectsService,
    private usersService: UsersService
    ) {}
    ngOnInit(): void {}

    saveSubject($event: Subject) {
      this.subjectsService.saveSubject($event,this.usersService.userToken.token).pipe().subscribe(x=>{
        console.log("============ID:=============");
        console.log(x.id);
        this.location.back();
      });
    }
}
