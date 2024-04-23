import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import { Observable, delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';
  constructor(private httpClient: HttpClient) {}

  list(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.API).pipe(
      // first()
      // tap((courses) => console.table(courses))
    );
  }

  loadById(id: string): Observable<Course> {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(course: Partial<Course>): Observable<Course> {
    if (course._id) {
      return this.update(course);
    }
    return this.create(course);
  }

  private create(course: Partial<Course>): Observable<Course> {
    return this.httpClient.post<Course>(this.API, course);
  }

  private update(course: Partial<Course>): Observable<Course> {
    return this.httpClient.put<Course>(`${this.API}/${course._id}`, course);
  }

  remove(id: string): Observable<Course> {
    return this.httpClient.delete<Course>(`${this.API}/${id}`);
  }
}
