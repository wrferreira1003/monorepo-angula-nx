import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      // Carrega primeiro o layout do auth
      import('./core/layout/auth/auth.layout').then((m) => m.AuthLayout),
    children: [
      {
        path: '',
        loadChildren: () =>
          // Carrega as rotas do auth
          import('./domain/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
    ],
  },
];
