import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Cita } from '../interfaces/cita';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private _http = inject(HttpClient);

  URL_CITAS = environment.apiUrl + '/citas';

  // petición POST -> agendar una cita nueva
  agendarCita(cita: Cita) {
    return this._http.post(this.URL_CITAS + '/agendar', cita);
  }

  // petición GET -> mostrar todas las citas
  mostrarCitas() {
    return this._http.get(this.URL_CITAS + '/mostrar');
  }

  // petición PUT -> actualizar una cita (por ejemplo, cambiar su estado)
  actualizarCita(id: string, cita: Partial<Cita>) {
    return this._http.put(this.URL_CITAS + '/actualizar/' + id, cita);
  }

  // petición DELETE -> eliminar/cancelar una cita
  eliminarCita(id: string) {
    return this._http.delete(this.URL_CITAS + '/eliminar/' + id);
  }
}