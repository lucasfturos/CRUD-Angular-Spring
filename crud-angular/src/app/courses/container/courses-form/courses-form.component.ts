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
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './courses-form.component.html',
  styleUrl: './courses-form.component.scss',
})
export class CourseFormComponent {
  form: FormGroup;
  id: string = '';

  constructor(
    private coursesService: CoursesService,
    private formBuilder: FormBuilder,
    private location: Location,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      _id: new FormControl<string>(''),
      name: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      category: new FormControl<string>('', [Validators.required]),
    });

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.coursesService.loadById(this.id).subscribe({
          next: (data) => {
            this.form.setValue(data);
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
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
