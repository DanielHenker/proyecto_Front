import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AboutUs } from './pages/about-us/about-us';
import { Citas } from './pages/citas/citas';
import { Products } from './pages/products/products';
import { Forms } from './pages/forms/forms';
import { Services } from './pages/services/services';
import { Register } from './pages/register/register';
import { Patients } from './pages/patients/patients';
import { NotFound } from './pages/not-found/not-found';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: Home, title: 'Inicio - Consultorio Dra. Edith Henker' },
  { path: 'nosotros', component: AboutUs, title: 'Sobre Nosotros' },
  { path: 'servicios', component: Services, title: 'Servicios Odontológicos' },
  { path: 'citas', component: Citas, title: 'Agendar Cita' },
  { path: 'admin/servicios', component: Products, canActivate: [adminGuard], title: 'Gestionar Servicios' },
  { path: 'admin/pacientes', component: Patients, canActivate: [adminGuard], title: 'Pacientes' },
  { path: 'login', component: Forms, title: 'Iniciar Sesión' },
  { path: 'registro', component: Register, title: 'Registro de Usuario' },
  { path: '**', component: NotFound, title: 'Página no encontrada' },
];
