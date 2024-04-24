import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Department } from "../domain/department.domain";


const DEPARTMENTS_API_URL = 'http://localhost:8080/webapp/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService{
    private http = inject(HttpClient);
    
    public getAll():Observable<Department[]>{
      const url = DEPARTMENTS_API_URL+"/getAll";
        // const headers = { 'Content-Type': 'application/json','Authorization':'Bearer '+jwt};
        const headers = { 'Content-Type': 'application/json'};
      return this.http.get<Department[]>(url,{headers});
    }
    getDepartment(id:number): Observable<Department> {
      const url = `${DEPARTMENTS_API_URL}/get/${id}`;
      // const headers = {'Authorization':`Bearer ${jwt}`};
      // return this.http.get<Department>(url,{headers});
      return this.http.get<Department>(url);
    }
    
    saveDepartment(department:Department):Observable<Department> {
      const url = `${DEPARTMENTS_API_URL}/save`;
      const body = `{"name":"${department.name}","shortName":"${department.shortName}"}`;
      // const headers = {'Authorization':`Bearer ${jwt}`,'Content-Type': 'application/json'};
      const headers = {'Content-Type': 'application/json'};
      return this.http.post<Department>(url,body,{headers});
    }
    updateDepartment(department:Department):Observable<Department> {
      const url = `${DEPARTMENTS_API_URL}/update`;
      const body = `{"id":${department.id},"name":"${department.name}","shortName":"${department.shortName}"}`;
      // const headers = {'Authorization':`Bearer ${jwt}`,'Content-Type': 'application/json'};
      const headers = {'Content-Type': 'application/json'};
      // console.log(body);
      return this.http.put<Department>(url,body,{headers});
    }

}