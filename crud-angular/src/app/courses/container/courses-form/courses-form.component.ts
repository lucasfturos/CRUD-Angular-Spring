import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';

import { Lesson } from '../../model/lesson';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';

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
    private location: Location,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
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
      lessons: this.formBuilder.array(this.retrieveLesson(course)),
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
      name: new FormControl<string>(lesson.name),
      videoUrl: new FormControl<string>(lesson.videoUrl),
    });
  }

  onSubmit(): void {
    this.coursesService.save(this.form.value).subscribe(
      (res) => this.onSucess(),
      (err) => this.onError()
    );
  }

  onCancel(): void {
    this.location.back();
  }

  private onSucess(): void {
    this.snackBar.open('Curso salvo com sucesso!', '', {
      duration: 5000,
    });

    this.onCancel();
  }

  private onError(): void {
    this.snackBar.open('Erro ao salvar curso!', '', {
      duration: 5000,
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `Tamanho mínimo necessário é de ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 100;
      return `Tamanho máximo necessário é de ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }
}
