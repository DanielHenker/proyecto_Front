import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../services/login';
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

  constructor(private loginService: Login, private router: Router) {}

  onSubmit() {
    this.loginService.iniciarSesion(this.credentials).subscribe({
      next: (response) => {
        this.mensaje = 'Inicio de sesión exitoso';
        // Guardamos el token JWT para futuras peticiones autenticadas
        this.loginService.guardarToken(response.token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.mensaje = error.error?.mensaje || 'Credenciales inválidas';
      }
    });
  }
}