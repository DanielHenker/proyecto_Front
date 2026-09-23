import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Login } from '../services/login';

// Protege las rutas de administración: solo deja pasar a usuarios
// logueados que además tengan el rol "admin".
export const adminGuard: CanActivateFn = () => {
  const loginService = inject(Login);
  const router = inject(Router);

  if (!loginService.estaLogueado()) {
    Swal.fire({
      icon: 'warning',
      title: 'Inicia sesión',
      text: 'Debes iniciar sesión para acceder a esta sección'
    });
    return router.createUrlTree(['/login']);
  }

  if (!loginService.esAdmin()) {
    Swal.fire({
      icon: 'error',
      title: 'Acceso restringido',
      text: 'Esta sección es solo para administradores'
    });
    return router.createUrlTree(['/']);
  }

  return true;
};
