import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Users } from '../../services/users';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private usersService = inject(Users);
  private router = inject(Router);

  user: User = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };

  onSubmit() {
   this.usersService.registrarUsuario(this.user).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Ya puedes iniciar sesión',
          timer: 1800,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo completar el registro',
          text: error.error?.message || 'Ocurrió un error al registrarte'
        });
      }
    });
  }
}
