import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { Employee } from "../domain/employee.domain";
import { Page } from "../domain/page";
import { EmployeeFilter } from "../domain/employeeFilter";
import { Status } from "../domain/status.enum";


const EMPLOYEES_API_URL = 'http://localhost:8080/webapp/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService{
    
    private http = inject(HttpClient);

    getEmployeesPage(page: number, size: number, filter:EmployeeFilter): Observable<Page<Employee>> {
      const url = `${EMPLOYEES_API_URL}/pageFilterPaginate?page=${page-1}&pageSize=${size}`;
      const body = `{"academicTitleId":${filter.academicTitleId},"educationTitleId":${filter.educationTitleId},"departmentId":${filter.departmentId},"status":"${filter.status}"}`;
      const headers = new  HttpHeaders().set("Content-Type","application/json");
      return this.http.post<Page<Employee>>(url,body,{headers});
    }
    getEmployees(): Observable<Employee[]> {
      const url = `${EMPLOYEES_API_URL}/getAll`;
      return this.http.get<Employee[]>(url);
    }
    countEmployees(departmentId:number,academicTitleId:number): Observable<number> {
      const url = `${EMPLOYEES_API_URL}/count?departmentId=${departmentId}&academicTitleId=${academicTitleId}`;
      return this.http.get<number>(url);
    }
    getEmployee(id:number): Observable<Employee> {
      const url = `${EMPLOYEES_API_URL}/getById/${id}`;
      return this.http.get<Employee>(url);
    }
    deleteLogically(id:number): Observable<Employee> {
      const url = `${EMPLOYEES_API_URL}/deleteLogically/${id}`;
      return this.http.get<Employee>(url);
    }
    restoreLogically(employee: Employee): Observable<Employee> {
      if(employee.status!="INACTIVE") return of(employee);
      employee.status=Status.Active;
      const url = `${EMPLOYEES_API_URL}/update`;
      const headers = new  HttpHeaders().set("Content-Type","application/json");
      return this.http.put<Employee>(url,JSON.stringify(employee),{headers:headers});
      
    }
    searchEmployee(searchTerm:string): Observable<Employee[]> {
      if(searchTerm=="") return of([]);
      const url = `${EMPLOYEES_API_URL}/search/${searchTerm}`;
      return this.http.get<Employee[]>(url);
    }
    
    saveEmployee(employee:Employee):Observable<Employee> {
      const url = `${EMPLOYEES_API_URL}/save`;
      const at = `{"id":${employee.academicTitle.id},"name":"${employee.academicTitle.name}"}`;
      const et = `{"id":${employee.educationTitle.id},"name":"${employee.educationTitle.name}"}`;
      const dep = `{"id":${employee.department.id},"name":"${employee.department.name}","shortName":"${employee.department.shortName}"}`;
      const birthday = `[${employee.birthday.getFullYear()},${employee.birthday.getMonth()+1},${employee.birthday.getDate()}]`;
      const body = `{"firstname":"${employee.firstname}","lastname":"${employee.lastname}","birthday":${birthday},"academicTitle":${at},"educationTitle":${et},"department":${dep},"status":"${employee.status}"}`;
      const headers = {'Content-Type': 'application/json'};
      return this.http.post<Employee>(url,body,{headers});
    }
    updateEmployee(employee:Employee):Observable<Employee> {
      const url = `${EMPLOYEES_API_URL}/update`;
      const at = `{"id":${employee.academicTitle.id},"name":"${employee.academicTitle.name}"}`;
      const et = `{"id":${employee.educationTitle.id},"name":"${employee.educationTitle.name}"}`;
      const dep = `{"id":${employee.department.id},"name":"${employee.department.name}","shortName":"${employee.department.shortName}"}`;
      const birthday = `[${employee.birthday.getFullYear()},${employee.birthday.getMonth()+1},${employee.birthday.getDate()}]`;
      const body = `{"id":${employee.id},"firstname":"${employee.firstname}","lastname":"${employee.lastname}","birthday":${birthday},"academicTitle":${at},"educationTitle":${et},"department":${dep},"status":"${employee.status}"}`;
      const headers = {'Content-Type': 'application/json'};
      return this.http.put<Employee>(url,body,{headers});
    }
}