import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CitasService } from '../../services/citas';
import { ProductsService } from '../../services/products';
import { Login } from '../../services/login';
import { Cita, CitaPoblada } from '../../interfaces/cita';
import { Product } from '../../interfaces/products';

@Component({
  selector: 'app-citas',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './citas.html',
  styleUrl: './citas.css',
})
export class Citas implements OnInit {

  // 1. Inyectar los servicios que necesitamos
  private _citasService = inject(CitasService);
  private _productsService = inject(ProductsService);
  private _loginService = inject(Login);

  // 2. Estado local con signals
  // (logueado y mensaje deben ser signals: esta app es zoneless, así que
  // una propiedad normal actualizada dentro de un .subscribe() no vuelve
  // a pintar la vista)
  logueado = signal(false);
  servicios = signal<Product[]>([]);
  misCitas = signal<CitaPoblada[]>([]);
  cargando = signal(false);
  mensaje = signal('');

  // 3. Modelo del formulario de agendamiento
  nuevaCita = {
    service: '',
    date: '',
    notes: ''
  };

  ngOnInit(): void {
    // Revisamos si hay una sesión activa apenas se carga la página
    this.logueado.set(this._loginService.estaLogueado());

    if (this.logueado()) {
      this.cargarServicios();
      this.cargarMisCitas();
    }
  }

  // GET -> traer los servicios disponibles, para llenar el selector del formulario
  cargarServicios() {
    this._productsService.mostrarProductos().subscribe({
      next: (data: any) => {
        this.servicios.set(data.datos ?? []);
      },
      error: () => {
        this.servicios.set([]);
      }
    });
  }

  // GET -> traer TODAS las citas, y quedarnos solo con las del usuario logueado
  cargarMisCitas() {
    this.cargando.set(true);
    const idUsuario = this._loginService.obtenerIdUsuario();

    this._citasService.mostrarCitas().subscribe({
      next: (data: any) => {
        const todasLasCitas: CitaPoblada[] = data.datos ?? [];
        this.misCitas.set(todasLasCitas.filter(cita => cita.user._id === idUsuario));
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
      }
    });
  }

  // POST -> agendar una cita nueva
  agendarCita() {
    const idUsuario = this._loginService.obtenerIdUsuario();

    if (!idUsuario) {
      this.mensaje.set('Debes iniciar sesión para agendar una cita');
      return;
    }

    // No enviamos el "user": el backend siempre toma el dueño de la cita
    // del token de sesión, nunca de lo que mande el cliente aquí.
    const cita: Cita = {
      service: this.nuevaCita.service,
      date: this.nuevaCita.date,
      notes: this.nuevaCita.notes
    };

    this._citasService.agendarCita(cita).subscribe({
      next: () => {
        this.mensaje.set('Cita agendada correctamente');
        this.nuevaCita = { service: '', date: '', notes: '' };
        this.cargarMisCitas(); // refrescamos la lista para que aparezca la nueva
      },
      error: (error) => {
        this.mensaje.set(error.error?.mensaje ?? 'Ocurrió un error al agendar la cita');
      }
    });
  }

  // PUT -> cancelar una cita (la actualizamos, no la borramos, para conservar el historial)
  cancelarCita(id: string) {
    this._citasService.actualizarCita(id, { status: 'cancelada' }).subscribe({
      next: () => {
        this.cargarMisCitas();
      }
    });
  }
}
