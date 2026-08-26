import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  cita = {
    servicio: '',
    fecha: '',
    notas: '',
  };

  mensaje: string = '';

  onSubmit() {
    // Cuando conectemos con el backend, aquí se llamará a un
    // servicio de Citas que haga POST a /citas/agendar
    this.mensaje = `Cita solicitada: "${this.cita.servicio}" para el ${this.cita.fecha}.`;
  }
}