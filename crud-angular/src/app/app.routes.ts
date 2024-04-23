import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    title: 'Courses',
    loadChildren: () =>
      import('./courses/courses-routing.module').then((m) => m.CoursesRoutingModule),
  },
];
