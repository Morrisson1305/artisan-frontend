import { Routes } from '@angular/router';
import { UserDashboardComponent } from './component/user-ddashboard/user-dashboard.component';


export const appRoutes: Routes = [
     {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('../app/component/home/home.component').then((m) => m.HomeComponent),
  },

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
  //dashboard routes
    {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../app/component/user-ddashboard/user-dashboard.component').then((m) => m.UserDashboardComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../app/component/pages/dashboard/profile/profile.component').then((m) => m.ProfileComponent),
      },
      // {
      //   path: 'bids',
      //   loadComponent: () =>
      //     import('../app/component/pages/dashboard/bids/bids.component').then((m) => m.BidsComponent),
      // },
      // {
      //   path: 'jobs',
      //   loadComponent: () =>
      //     import('./pages/dashboard/jobs/jobs.component').then((m) => m.JobsComponent),
      // },
    ],
  },


  {
    path: '**',
    redirectTo: '',
  },
];
