import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Person } from './person-model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class PersonService {
  url = 'https://localhost:4200/person';

  constructor(private http: HttpClient) { }

  List(): Observable<Person[]>{
    return this.http.get<Person[]>(this.url);
  }

  GetById(id: number): Observable<Person>{
    const apiUrl = `${this.url}/${id}`;

    return this.http.get<Person>(apiUrl);
  }

  Create(person: Person): Observable<any>{
    return this.http.post<Person>(this.url, person, httpOptions);
  }

  Update(person: Person): Observable<any>{
    return this.http.put<Person>(this.url, person, httpOptions);
  }

  Delete(id: number): Observable<any>{
    const apiUrl = `${this.url}/${id}`;

    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
