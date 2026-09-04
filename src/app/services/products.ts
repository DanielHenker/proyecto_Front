import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../interfaces/products'; // ajusta el nombre si tu interfaz se llama distinto

@Injectable({
  providedIn: 'root'
})
export class Products {

  // 1. inyectar dependencias
  private _http = inject(HttpClient);

  // 2. ruta de conexión con el backend
  URL_PRODUCTOS = environment.apiUrl + '/productos';

  // 3. Implementar las peticiones al backend

  // petición POST
  crearProducto(producto: Product) {
    return this._http.post(this.URL_PRODUCTOS + '/crear', producto);
  }

  // petición GET
  mostrarProductos() {
    return this._http.get(this.URL_PRODUCTOS + '/mostrar');
  }

  // petición PUT
  editarProducto(id: string, producto: Product) {
    return this._http.put(this.URL_PRODUCTOS + '/actualizar/' + id, producto);
  }

  // petición DELETE
  eliminarProducto(id: string) {
    return this._http.delete(this.URL_PRODUCTOS + '/eliminar/' + id);
  }
}