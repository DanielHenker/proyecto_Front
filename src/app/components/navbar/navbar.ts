import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Login } from '../../services/login';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  private loginService = inject(Login);
  private router = inject(Router);

  logueado = signal(this.loginService.estaLogueado());
  esAdmin = signal(this.loginService.esAdmin());

  constructor() {
    // Cada vez que se completa una navegación (por ejemplo, justo después
    // de iniciar sesión o cerrarla) volvemos a comprobar el estado,
    // para que el menú se actualice sin tener que recargar la página.
    this.router.events
      .pipe(filter((evento) => evento instanceof NavigationEnd))
      .subscribe(() => {
        this.logueado.set(this.loginService.estaLogueado());
        this.esAdmin.set(this.loginService.esAdmin());
      });
  }

  cerrarSesion() {
    Swal.fire({
      icon: 'question',
      title: '¿Cerrar sesión?',
      text: 'Tendrás que volver a iniciar sesión para acceder a tu cuenta',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.loginService.cerrarSesion();
        this.logueado.set(false);
        this.esAdmin.set(false);
        this.router.navigate(['/']);
        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada',
          timer: 1200,
          showConfirmButton: false
        });
      }
    });
  }
}
