import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const state = auth.authState();

  if (state.isAuthenticated) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
