import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';

import { Course } from '../model/course';
import { CoursePage } from '../model/course-page';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';
  constructor(private httpClient: HttpClient) {}

  list(pageNumber: number = 0, pageSize: number = 10): Observable<CoursePage> {
    return this.httpClient
      .get<CoursePage>(this.API, { params: { pageNumber, pageSize } })
      .pipe(first());
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
