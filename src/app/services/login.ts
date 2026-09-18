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

  // 6. Obtener el ID del usuario autenticado, extrayéndolo del propio token
  obtenerIdUsuario(): string | null {
    const token = this.obtenerToken();
    if (!token) return null;

    try {
      // Un JWT tiene 3 partes separadas por puntos: encabezado.payload.firma
      const payloadBase64 = token.split('.')[1];

      // El JWT codifica el payload en "base64url" (variante de base64 para URLs);
      // estos dos replace lo convierten a base64 normal antes de decodificarlo
      const payloadBase64Normal = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');

      // atob() decodifica de base64 a texto plano; ese texto es un JSON
      const payloadDecodificado = JSON.parse(atob(payloadBase64Normal));

      // Recordemos que en el backend generamos el token con { id: user._id, email: user.email }
      return payloadDecodificado.id;
    } catch (error) {
      return null;
    }
  }
}