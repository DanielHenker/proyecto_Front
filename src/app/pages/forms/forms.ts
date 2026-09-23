import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Login } from '../../services/login';
import { Credentials } from '../../interfaces/credentials';

@Component({
  selector: 'app-forms',
  imports: [FormsModule],
  templateUrl: './forms.html',
  styleUrl: './forms.css'
})
export class Forms {
  private loginService = inject(Login);
  private router = inject(Router);

  credentials: Credentials = {
    email: '',
    password: ''
  };

  onSubmit() {
    this.loginService.iniciarSesion(this.credentials).subscribe({
      next: (response) => {
        this.loginService.guardarToken(response.token);
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Inicio de sesión exitoso',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/']);
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo iniciar sesión',
          text: error.error?.mensaje || 'Credenciales inválidas'
        });
      }
    });
  }
}
