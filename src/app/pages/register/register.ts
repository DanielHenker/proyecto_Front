import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../../services/users';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  user: User = {
    name: '',
    email: '',
    password: ''
  };

  mensaje: string = '';

  constructor(private usersService: Users, private router: Router) {}

  onSubmit() {
   this.usersService.registrarUsuario(this.user).subscribe({
      next: () => {
        this.mensaje = 'Registro exitoso, ya puedes iniciar sesión';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (error) => {
        this.mensaje = error.error?.message || 'Ocurrió un error al registrarte';
      }
    });
  }
}