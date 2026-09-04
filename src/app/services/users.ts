// Implementar lógica en cualquier parte del proyecto de Angular
// Consumir los servicios de un backend!!!
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Users {
    // 1. Inyectar dependencias
    _http = inject(HttpClient);

    // 2. Ruta de conexión con el backend
    URL_USUARIOS = environment.apiUrl + '/usuarios';

    // 3. Implementar las peticiones al backend

    // 3.1. Mostrar todos los usuarios
    mostrarUsuarios() {
        return this._http.get(this.URL_USUARIOS + '/mostrar');
    }

    // 3.2. Registrar un usuario
    registrarUsuario(user: User) {
        return this._http.post(this.URL_USUARIOS + '/registrar', user);
    }

    // 3.3. Actualizar un usuario
    actualizarUsuario(id: string, user: Partial<User>) {
        return this._http.put(this.URL_USUARIOS + '/actualizar/' + id, user);
    }

    // 3.4. Eliminar un usuario
    eliminarUsuario(id: string) {
        return this._http.delete(this.URL_USUARIOS + '/eliminar/' + id);
    }
}