import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { AcademicTitle } from "../domain/academicTitle.domain";
import { EmployeeAcademicTitle } from "../domain/employeeAcademicTitle.domain";


const EMPLOYEE_ACADEMIC_TITLES_API_URL = 'http://localhost:8080/webapp/historyItem';

@Injectable({
  providedIn: 'root',
})
export class AcademicTitleHistoryService{
    private http = inject(HttpClient);
    
    public getEmployeeAcademicTitleHistory(employeeId:number):Observable<EmployeeAcademicTitle[]>{
      const url = EMPLOYEE_ACADEMIC_TITLES_API_URL+`/get/employee/${employeeId}`;
      return this.http.get<EmployeeAcademicTitle[]>(url);
    }
    public saveEmployeeAcademicTitleHistory(toSave:EmployeeAcademicTitle[],toDelete:EmployeeAcademicTitle[]):Observable<EmployeeAcademicTitle[]>{
      const url = EMPLOYEE_ACADEMIC_TITLES_API_URL+`/saveChanges`;//ovo promeniti
      const body =JSON.stringify({toSave:toSave,toDelete:toDelete}, null, 2);
      return this.http.post<EmployeeAcademicTitle[]>(url,body);
    }


}