import { Component, OnInit, inject, signal } from '@angular/core';
import { Users } from '../../services/users';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-patients',
  imports: [],
  templateUrl: './patients.html',
  styleUrl: './patients.css'
})
export class Patients implements OnInit {
  private usersService = inject(Users);

  pacientes = signal<User[]>([]);
  cargando = signal(false);
  mensaje = signal('');

  ngOnInit() {
    this.cargando.set(true);
    this.usersService.mostrarUsuarios().subscribe({
      next: (response: any) => {
        const todos: User[] = response.datos || [];
        // Esta pantalla es para consultar pacientes, no cuentas de administrador
        const soloPacientes = todos.filter((u) => u.role !== 'admin');
        this.pacientes.set(soloPacientes);
        this.cargando.set(false);
        if (soloPacientes.length === 0) {
          this.mensaje.set('No hay pacientes registrados todavía');
        }
      },
      error: () => {
        this.cargando.set(false);
        this.mensaje.set('Ocurrió un error al cargar los pacientes');
      }
    });
  }
}
