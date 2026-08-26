import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../../services/users';
import { Credentials } from '../../interfaces/credentials';

@Component({
  selector: 'app-forms',
  imports: [FormsModule],
  templateUrl: './forms.html',
  styleUrl: './forms.css'
})
export class Forms {
  credentials: Credentials = {
    email: '',
    password: ''
  };

  mensaje: string = '';

  constructor(private usersService: Users, private router: Router) {}

  onSubmit() {
    this.usersService.login(this.credentials).subscribe({
      next: (response: any) => {
        this.mensaje = 'Inicio de sesión exitoso';
        // Guardamos el token JWT para futuras peticiones autenticadas
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.mensaje = error.error?.mensaje || 'Credenciales inválidas';
      }
    });
  }
}