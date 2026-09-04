import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class Login {

  _http = inject(HttpClient);

  URL_LOGIN = environment.apiUrl + '/usuarios/iniciar-sesion';

  // Logica de inicio de sesión

  // 1. LOGIN -> petición POST
  iniciarSesion(credentials: Credentials) {
    return this._http.post<{ mensaje: string; token: string }>(this.URL_LOGIN, credentials);
  }

  // 2. Guardar el token en el localStorage
  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  // 3. Obtener el token del localStorage
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  // 4. LOGOUT -> Eliminar el token del localStorage
  cerrarSesion() {
    localStorage.removeItem('token');
  }

  // 5. Validar si el usuario está logueado
 estaLogueado(): boolean {
    return !!this.obtenerToken();
}    
}