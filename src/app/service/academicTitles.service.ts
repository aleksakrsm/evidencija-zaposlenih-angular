import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { AcademicTitle } from "../domain/academicTitle.domain";


const ACADEMIC_TITLES_API_URL = 'http://localhost:8080/webapp/academicTitle';

@Injectable({
  providedIn: 'root',
})
export class AcademicTitlesService{
    private http = inject(HttpClient);
    
    public getAll():Observable<AcademicTitle[]>{
      const url = ACADEMIC_TITLES_API_URL+"/getAll";
        // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
        // console.log(headers);
      return this.http.get<AcademicTitle[]>(url);
    }

}