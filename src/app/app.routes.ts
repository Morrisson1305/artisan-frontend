import { Routes } from '@angular/router';


export const appRoutes: Routes = [
    {
    path: 'become-artisan',
    loadComponent: () =>
      import('../app/component/registration/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../app/component/login/login.component').then((m) => m.LoginComponent),
  },
    {
    path: 'about',
    loadComponent: () =>
      import('../app/component/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'user-dashboard',
    loadComponent: () => import('../app/component/user-ddashboard/user-dashboard.component').then((m) => m.UserDashboardComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('../app/component/home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: '**',
    redirectTo: '',
  },
];
