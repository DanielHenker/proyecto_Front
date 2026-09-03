import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/products';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Products {
    // 1. Inyectar dependencias
    _http = inject(HttpClient);

    // 2. Ruta de conexión con el backend
    URL_PRODUCTOS = environment.apiUrl + '/productos';

    // 3. Implementar las peticiones al backend

    // 3.1. Mostrar todos los servicios
    mostrarProductos() {
        return this._http.get(this.URL_PRODUCTOS + '/mostrar');
    }

    // 3.2. Crear un nuevo servicio
    crearProducto(product: Product) {
        return this._http.post(this.URL_PRODUCTOS + '/crear', product);
    }
}