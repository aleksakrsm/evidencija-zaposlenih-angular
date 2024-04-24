import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { EducationTitle } from "../domain/educationTitle.domain";


const EDUCATION_TITLES_API_URL = 'http://localhost:8080/webapp/educationTitle';

@Injectable({
  providedIn: 'root',
})
export class EducationTitlesService{
    private http = inject(HttpClient);
    
    // public getAll(jwt:string):Observable<EducationTitle[]>{
    public getAll():Observable<EducationTitle[]>{
      const url = EDUCATION_TITLES_API_URL+"/getAll";
      //   const headers = { 'Content-Type': 'application/json','Authorization':'Bearer '+jwt};
      // return this.http.get<EducationTitle[]>(url,{headers});
      return this.http.get<EducationTitle[]>(url);
    }

}