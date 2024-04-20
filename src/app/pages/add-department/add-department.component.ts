import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../service/departments.service';
import { UsersService } from '../../service/users.service';
import { Department } from '../../domain/department.domain';
import { Location } from '@angular/common';
import { DepartmentInfoComponent } from '../../components/department-info/department-info.component';

@Component({
  selector: 'app-add-department',
  standalone: true,
  imports: [DepartmentInfoComponent],
  template:`
    <app-department-info (departmentEmitter)="saveDepartment($event)"></app-department-info>
  `,
  styleUrl: './add-department.component.scss'
})
export class AddDepartmentComponent implements OnInit{
  constructor(
    private location: Location,
    private departmentsService: DepartmentsService,
    private usersService: UsersService
    ) {}
    ngOnInit(): void {}

    saveDepartment($event: Department) {
      this.departmentsService.saveDepartment($event,this.usersService.userToken.token).pipe().subscribe(x=>{
        console.log("============ID:=============");
        console.log(x.id);
        this.location.back();
      });
    }
}
