import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CoursesListComponent,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoursesComponent {
  courses$!: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    public dialogError: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh(): void {
    this.courses$ = this.coursesService.list().pipe(
      catchError((err) => {
        this.onError('Erro ao carregar os cursos!');
        return of([]);
      })
    );
  }

  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  onEdit(course: Course): void {
    this.router.navigate(['edit', course._id], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(course: Course): void {
    this.coursesService.remove(course._id).subscribe(
      (next) => {
        this.refresh();
        this.snackBar.open('Curso removido com sucesso!', '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      (err) => {
        this.onError('Erro ao tentar remover curso!');
      }
    );
  }

  onError(errMessage: string): void {
    this.dialogError.open(ErrorDialogComponent, {
      data: errMessage,
    });
  }
}
