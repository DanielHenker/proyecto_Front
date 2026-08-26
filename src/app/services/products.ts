import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class Products {
  private apiUrl = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) {}

  getServices(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/mostrar`);
  }

  createService(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/crear`, product);
  }

  updateService(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/actualizar/${id}`, product);
  }

  deleteService(id: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }
}