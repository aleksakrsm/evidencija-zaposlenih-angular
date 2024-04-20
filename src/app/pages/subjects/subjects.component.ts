import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '../../service/subjects.service';
import { UsersService } from '../../service/users.service';
import { Subject } from '../../domain/subject.domain';
import { SubjectsPageComponent } from '../../components/subjects-page/subjects-page.component';
import { SubjectsFilterComponent } from '../../components/subjects-filter/subjects-filter.component';
import { catchError } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [SubjectsPageComponent,SubjectsFilterComponent,RouterLinkActive,RouterLink],
  template:`
  <app-subjects-filter
    (filterChanged)="filterChanged($event)"
    ></app-subjects-filter>
    <br>
    <app-subjects-page
      [currentPage]="page"
      [totalPages]="totalPages"
      [subjects]="subjects"
      (outputPageSize)="sizeChanged($event)"
      (outputCurrentPage)="pageChanged($event)"
    ></app-subjects-page>
    <br>
    <br>
    <a routerLink="../subjects/add" routerLinkActive="active" >Add New Subject</a>
  `,
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent implements OnInit{
  page: number = 1; //uzeti iz podkomponente
  size: number = 10; //uzeo
  totalPages: number = 1;
  subjects:Subject[] = [];
  studiesTypeFilter:string = "";
  constructor(
    private subjectsService: SubjectsService,
    private usersService: UsersService
  ) {}
  ngOnInit(): void {
    this.subjectsService
      .getSubjectsPageWithoutFilter(1, 10,this.usersService.userToken.token).pipe(
        catchError((err)=>{
          this.subjects = [];
          throw(err);
        })
      )
      .subscribe((x) => {
        console.log(x.content.length)
        this.subjects = x.content;
        this.totalPages = x.totalPages;
        this.size = x.size;
      });
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    if(this.studiesTypeFilter===""||this.studiesTypeFilter==="-- Select --"){
      this.subjectsService
        .getSubjectsPageWithoutFilter(newPage, this.size,this.usersService.userToken.token).pipe(
          catchError((err)=>{
            this.subjects = [];
            throw(err);
          })
        )
        .subscribe((x) => {
          this.subjects = x.content;
        });
    }
      else{
        this.subjectsService
        .getSubjectsPage(newPage, this.size,this.usersService.userToken.token, this.studiesTypeFilter).pipe(
          catchError((err)=>{
            this.subjects = [];
            throw(err);
          })
        )
        .subscribe((x) => {
          this.subjects = x.content;
        });
      }
  }

  sizeChanged(newSize: number): void {
    console.log("logika:" + newSize);
    this.size = newSize;
    if(this.studiesTypeFilter===""||this.studiesTypeFilter==="-- Select --"){
      this.subjectsService
      .getSubjectsPageWithoutFilter(1, newSize,this.usersService.userToken.token).pipe(
        catchError((err)=>{
          this.subjects = [];
          throw(err);
        })
      )
      .subscribe((x) => {
        this.page = 1;
        console.log("subscribe:" + this.size);
          this.subjects = x.content;
          this.totalPages = x.totalPages;
          console.log("x.content.length: ")
          console.log(x.content.length)
        });
    }
      else{
        this.subjectsService
    .getSubjectsPage(1, newSize,this.usersService.userToken.token, this.studiesTypeFilter).pipe(
      catchError((err)=>{
        this.subjects = [];
        throw(err);
      })
    )
    .subscribe((x) => {
      this.page = 1;
      console.log("subscribe:" + this.size);
        this.subjects = x.content;
        this.totalPages = x.totalPages;
        console.log("x.content.length: ")
        console.log(x.content.length)
      });
    }
  }

  filterChanged(newFilter: string): void {
    this.studiesTypeFilter = newFilter;
    if(this.studiesTypeFilter===""||this.studiesTypeFilter==="-- Select --"){
      this.subjectsService
      .getSubjectsPageWithoutFilter(1, this.size,this.usersService.userToken.token).pipe(
        catchError((err)=>{
          this.subjects = [];
          throw(err);
        })
      )
      .subscribe((x) => {
        this.page = 1;
        this.subjects = x.content;
        this.totalPages = x.totalPages;
      });
    }
      else{
        this.subjectsService
      .getSubjectsPage(1, this.size,this.usersService.userToken.token, this.studiesTypeFilter).pipe(
        catchError((err)=>{
          this.subjects = [];
          throw(err);
        })
      )
      .subscribe((x) => {
        this.page = 1;
        this.subjects = x.content;
        this.totalPages = x.totalPages;
      });
      }
  }
}
