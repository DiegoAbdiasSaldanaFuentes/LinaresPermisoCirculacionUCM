import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { AlertService } from '../services/alert';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const alert = inject(AlertService);

  if (auth.estaAutenticado()) {
    return true;
  }

  alert.advertencia('Debes iniciar sesión para acceder a esta sección.');
  return router.createUrlTree(['/login']);
};