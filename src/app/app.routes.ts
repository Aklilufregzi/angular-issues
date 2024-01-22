import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)},

  {path:'table', loadComponent: () => import('./pages/table/table.component').then(m => m.TableComponent)},
];
