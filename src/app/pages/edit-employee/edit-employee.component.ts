import { Component, OnInit } from '@angular/core';
import { Employee } from '../../domain/employee.domain';
import { EmployeesService } from '../../service/employees.service';
import { UsersService } from '../../service/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [],
  // templateUrl: './edit-employee.component.html',
  template:`
  radi:
    {{employee?.firstname}}
  `,
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit{
  employee?:Employee;
  id!:number;
  constructor(private employeesService:EmployeesService,private usersService:UsersService,private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id = +params['id'];
    });
    this.employeesService.getEmployee(this.id,this.usersService.userToken.token).subscribe(x=>this.employee = x);
  }

}
