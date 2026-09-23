import { HttpInterceptorFn } from '@angular/common/http';

// Agrega automáticamente el token guardado (si existe) a todas las peticiones,
// para que el backend sepa quién eres y qué rol tienes sin tener que
// repetir este código en cada servicio.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
