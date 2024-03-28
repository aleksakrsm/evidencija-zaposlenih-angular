import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "../domain/employee.domain";
import { Page } from "../domain/page";
import { EmployeeFilter } from "../domain/employeeFilter";


const EMPLOYEES_API_URL = 'http://localhost:8080/webapp/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService{
    private http = inject(HttpClient);

    getEmployeesPage(page: number, size: number, filter:EmployeeFilter,jwt:string): Observable<Page<Employee>> {
      const url = `${EMPLOYEES_API_URL}/pageFilterPaginate?page=${page-1}&pageSize=${size}`;
      const body = `{"academicTitleId":${filter.academicTitleId},"educationTitleId":${filter.educationTitleId},"departmentId":${filter.departmentId},"status":"${filter.status}"}`;
      const headers = new  HttpHeaders().set("accept","*/*").set("Authorization","Bearer "+jwt).set("Content-Type","application/json");
      return this.http.post<Page<Employee>>(url,body,{headers});
    }
    getEmployees(jwt:string): Observable<Employee[]> {
      const url = `${EMPLOYEES_API_URL}/getAll`;
      const headers = {'Authorization':`Bearer ${jwt}`};
      return this.http.get<Employee[]>(url,{headers});
    }
    getEmployee(id:number,jwt:string): Observable<Employee> {
      const url = `${EMPLOYEES_API_URL}/getById/${id}`;
      const headers = {'Authorization':`Bearer ${jwt}`};
      return this.http.get<Employee>(url,{headers});
    }
}