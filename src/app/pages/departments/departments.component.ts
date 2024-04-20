import { Component, OnInit } from '@angular/core';
import { Department } from '../../domain/department.domain';
import { UsersService } from '../../service/users.service';
import { DepartmentsService } from '../../service/departments.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <h3>Departments</h3>
    <div>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Short name</td>
          </tr>
        </thead>
        <tbody>
          <tr
            *ngFor="let d of departments"
            routerLink="../departments/{{ d.id }}"
          >
            <td>{{ d.id }}</td>
            <td>{{ d.name }}</td>
            <td>{{ d.shortName }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
    <a routerLink="../departments/add" routerLinkActive="active">Add New Department</a
    >
  `,
  styleUrl: './departments.component.scss',
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];
  constructor(
    private departmentsService: DepartmentsService,
    private usersService: UsersService
  ) {}
  ngOnInit(): void {
    this.departmentsService
      .getAll(this.usersService.userToken.token)
      .subscribe((x) => {
        this.departments = x;
      });
  }
}
