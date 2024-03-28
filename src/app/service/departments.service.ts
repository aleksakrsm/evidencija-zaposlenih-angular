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
    
    public getAll(jwt:string):Observable<Department[]>{
      const url = DEPARTMENTS_API_URL+"/getAll";
        const headers = { 'Content-Type': 'application/json','Authorization':'Bearer '+jwt};
      return this.http.get<Department[]>(url,{headers});
    }

}