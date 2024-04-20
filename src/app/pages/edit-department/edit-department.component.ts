import { Component } from '@angular/core';
import { DepartmentInfoComponent } from '../../components/department-info/department-info.component';
import { DepartmentsService } from '../../service/departments.service';
import { UsersService } from '../../service/users.service';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../domain/department.domain';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-department',
  standalone: true,
  imports: [DepartmentInfoComponent],
  template:`
    <app-department-info
      (departmentEmitter)="updateDepartment($event)"
      [department]="department"
    ></app-department-info>
  `,
  styleUrl: './edit-department.component.scss'
})
export class EditDepartmentComponent {
  id!: number;
  department: Department = {
    name: '',
    shortName:""
  };
  
  constructor(
    private departmentsService: DepartmentsService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private location:Location
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
    });
    this.departmentsService
      .getDepartment(this.id, this.usersService.userToken.token)
      .subscribe((x) => (this.department = x));
  }
  updateDepartment($event: Department) {
    // ovo izmeniti jer vraca novi emp umesto da update stari
    $event.id = this.id;
    this.departmentsService
      .updateDepartment($event, this.usersService.userToken.token)
      .pipe()
      .subscribe((x) => {
        console.log('============ID:====updated=========');
        console.log(x.id);
        this.location.back();
      });
  }
}
