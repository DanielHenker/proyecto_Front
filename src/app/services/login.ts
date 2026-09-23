import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Credentials } from '../interfaces/credentials';

@Injectable({ providedIn: 'root' })
export class Login {
  _http = inject(HttpClient);
  URL_LOGIN = environment.apiUrl + '/usuarios/iniciar-sesion';

  iniciarSesion(credentials: Credentials) {
    return this._http.post<{ mensaje: string; token: string }>(this.URL_LOGIN, credentials);
  }
  guardarToken(token: string) { localStorage.setItem('token', token); }
  obtenerToken(): string | null { return localStorage.getItem('token'); }
  cerrarSesion() { localStorage.removeItem('token'); }
  estaLogueado(): boolean { return !!this.obtenerToken(); }

  private decodificarToken(): any | null {
    const token = this.obtenerToken();
    if (!token) return null;
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadBase64Normal = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(payloadBase64Normal));
    } catch (error) {
      return null;
    }
  }

  obtenerIdUsuario(): string | null {
    return this.decodificarToken()?.id ?? null;
  }

  obtenerRol(): 'admin' | 'usuario' | null {
    return this.decodificarToken()?.role ?? null;
  }

  esAdmin(): boolean {
    return this.obtenerRol() === 'admin';
  }
}
