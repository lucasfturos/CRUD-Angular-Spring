import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';

import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './courses-form.component.html',
  styleUrl: './courses-form.component.scss',
})
export class CourseFormComponent {
  form!: FormGroup;
  id: string = '';
  dataCourse!: Course;

  constructor(
    private coursesService: CoursesService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public formUtilsService: FormUtilsService
  ) {
    this.createFormBuilder({ _id: '', name: '', category: '', lessons: [] });

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id && params) {
        this.coursesService.loadById(this.id).subscribe({
          next: (data) => {
            this.createFormBuilder(data);
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    });
  }

  private createFormBuilder(course: Course): void {
    this.form = this.formBuilder.group({
      _id: new FormControl<string>(course._id),
      name: new FormControl<string>(course.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      category: new FormControl<string>(course.category, [Validators.required]),
      lessons: this.formBuilder.array(
        this.retrieveLesson(course),
        Validators.required
      ),
    });
  }

  private retrieveLesson(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach((lesson) =>
        lessons.push(this.createLesson(lesson))
      );
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', videoUrl: '' }) {
    return this.formBuilder.group({
      id: new FormControl<string>(lesson.id),
      name: new FormControl<string>(lesson.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      videoUrl: new FormControl<string>(lesson.videoUrl, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(20),
      ]),
    });
  }

  getLessonFormArray() {
    return (<UntypedFormArray>this.form.get('lessons'))?.controls;
  }

  addNewLesson(): void {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson(index: number): void {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.coursesService.save(this.form.value).subscribe({
        next: () => this.formUtilsService.onSucess('Curso salvo com sucesso!'),
        error: () => this.formUtilsService.onError('Erro ao salvar curso!'),
      });
    } else {
      this.formUtilsService.valideAllFormField(this.form);
      this.formUtilsService.onError('Erro ao salvar curso!');
    }
  }
}
