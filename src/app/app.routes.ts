import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Forms } from './pages/forms/forms';
import { Services } from './pages/services/services';
import { Register } from './pages/register/register';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home, title: 'Inicio - Consultorio Dra. Edith Henker' },
  { path: 'servicios', component: Services, title: 'Servicios Odontológicos' },
  { path: 'citas', component: Products, title: 'Agendar Cita' },
  { path: 'login', component: Forms, title: 'Iniciar Sesión' },
  { path: 'registro', component: Register, title: 'Registro de Usuario' },
  { path: '**', component: NotFound, title: 'Página no encontrada' },
];