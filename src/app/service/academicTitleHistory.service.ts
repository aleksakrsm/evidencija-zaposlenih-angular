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
    
    public getEmployeeAcademicTitleHistory(employeeId:number,jwt:string):Observable<EmployeeAcademicTitle[]>{
      const url = EMPLOYEE_ACADEMIC_TITLES_API_URL+`/get/employee/${employeeId}`;
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
      return this.http.get<EmployeeAcademicTitle[]>(url,{headers});
    }
    public saveEmployeeAcademicTitleHistory(toSave:EmployeeAcademicTitle[],toDelete:EmployeeAcademicTitle[],jwt:string):Observable<EmployeeAcademicTitle[]>{
      const url = EMPLOYEE_ACADEMIC_TITLES_API_URL+`/saveChanges`;//ovo promeniti
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
      const body =JSON.stringify({toSave:toSave,toDelete:toDelete}, null, 2);
      // const body =`"toSave":${JSON.stringify(toSave)},"toDelete":${JSON.stringify(toDelete)}`;
      console.log(body);
      // console.log(history.length)
      return this.http.post<EmployeeAcademicTitle[]>(url,body,{headers});
    }


}