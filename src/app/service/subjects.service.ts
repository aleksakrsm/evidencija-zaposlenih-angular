import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "../domain/page";
import { Subject } from "../domain/subject.domain";


const SUBJECTS_API_URL = 'http://localhost:8080/webapp/subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService{
    private http = inject(HttpClient);

    getSubjectsPage(page: number, size: number, studiesType:string): Observable<Page<Subject>> {
      const url = `${SUBJECTS_API_URL}/pageFilterPaginate?page=${page-1}&pageSize=${size}`;
      // console.log(url);
      const body = `{"studiesType":"${studiesType}"}`;
      // console.log(body);
      // const headers = new  HttpHeaders().set("accept","*/*").set("Authorization","Bearer "+jwt).set("Content-Type","application/json");
      const headers = new  HttpHeaders().set("accept","*/*").set("Content-Type","application/json");
      return this.http.post<Page<Subject>>(url,body,{headers});
    }
    getSubjectsPageWithoutFilter(page: number, size: number): Observable<Page<Subject>> {
      const url = `${SUBJECTS_API_URL}/page?page=${page-1}&pageSize=${size}`;
      // console.log(url);
      // const headers = new  HttpHeaders().set("accept","*/*").set("Authorization","Bearer "+jwt).set("Content-Type","application/json");
      const headers = new  HttpHeaders().set("accept","*/*").set("Content-Type","application/json");
      return this.http.get<Page<Subject>>(url,{headers});
    }
    getSubject(id:number): Observable<Subject> {
      const url = `${SUBJECTS_API_URL}/get/${id}`;
      // const headers = {'Authorization':`Bearer ${jwt}`};
      // return this.http.get<Subject>(url,{headers});
      return this.http.get<Subject>(url);
    }
    
    saveSubject(subject:Subject):Observable<Subject> {
      const url = `${SUBJECTS_API_URL}/save`;
      const body = `{"name":"${subject.name}","ects":${subject.ects},"studiesType":"${subject.studiesType}"}`;
      // const headers = {'Authorization':`Bearer ${jwt}`,'Content-Type': 'application/json'};
      const headers = {'Content-Type': 'application/json'};
      return this.http.post<Subject>(url,body,{headers});
    }
    updateSubject(subject:Subject):Observable<Subject> {
      const url = `${SUBJECTS_API_URL}/update`;
      const body = `{"id":${subject.id},"name":"${subject.name}","ects":${subject.ects},"studiesType":"${subject.studiesType}"}`;
      // const headers = {'Authorization':`Bearer ${jwt}`,'Content-Type': 'application/json'};
      const headers = {'Content-Type': 'application/json'};
      // console.log(body);
      return this.http.put<Subject>(url,body,{headers});
    }
}