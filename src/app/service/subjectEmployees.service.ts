import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { AcademicTitle } from "../domain/academicTitle.domain";
import { EmployeeAcademicTitle } from "../domain/employeeAcademicTitle.domain";
import { EmployeeSubject } from "../domain/employeeSubject.domain";


const EMPLOYEE_SUBJECT_API_URL = 'http://localhost:8080/webapp/employeeSubject';

@Injectable({
  providedIn: 'root',
})
export class EmployeeSubjectService{
    private http = inject(HttpClient);
    
    public getSubjectEmployees(subjectId:number,jwt:string):Observable<EmployeeSubject[]>{
      const url = EMPLOYEE_SUBJECT_API_URL+`/get/subject/${subjectId}`;
      console.log(url);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
      return this.http.get<EmployeeSubject[]>(url,{headers});
    }
    public saveSubjectEmployees(toSave:EmployeeSubject[],toDelete:EmployeeSubject[],jwt:string):Observable<EmployeeSubject[]>{
      const url = EMPLOYEE_SUBJECT_API_URL+`/saveChanges`;//ovo promeniti
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
      const body =JSON.stringify({toSave:toSave,toDelete:toDelete}, null, 2);
      console.log(body);
      // console.log(history.length)
      return this.http.post<EmployeeSubject[]>(url,body,{headers});
    }


}