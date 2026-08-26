import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root',
})
export class Users {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/registrar`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/mostrar`);
  }

  login(credentials: Credentials): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(`${this.apiUrl}/iniciar-sesion`, credentials);
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/actualizar/${id}`, user);
  }

  deleteUser(id: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }
}