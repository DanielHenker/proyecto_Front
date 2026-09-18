import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { ProductsService } from '../../services/products';
import { Product } from '../../interfaces/products';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {

  // 1. Inyectar el servicio con inject()
  private _productsService = inject(ProductsService);

  // 2. Estado local con signals
  servicios = signal<Product[]>([]);
  cargando = signal(false);

  // 3. Modelo para el formulario de creación de servicio
  nuevoServicio: Product = {
    name: '',
    description: '',
    category: '',
    price: 0,
    active: true
  };

  ngOnInit(): void {
    this.mostrarServicios();
  }

  // GET
  mostrarServicios() {
    this.cargando.set(true);

    this._productsService.mostrarProductos().subscribe({
      next: (data: any) => {
        this.servicios.set(data.datos ?? []);
        this.cargando.set(false);
      },
      error: (err: any) => {
        this.cargando.set(false);
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: 'No se pudieron cargar los servicios'
        });
      }
    });
  }

  // POST
  crearServicio() {
    this._productsService.crearProducto(this.nuevoServicio).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Servicio creado',
          timer: 1500,
          showConfirmButton: false
        });
        this.nuevoServicio = { name: '', description: '', category: '', price: 0, active: true };
        this.mostrarServicios();
      },
      error: (err: any) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear el servicio'
        });
      }
    });
  }

  // DELETE (con confirmación previa)
  eliminarServicio(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._productsService.eliminarProducto(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El servicio fue eliminado', 'success');
            this.mostrarServicios();
          },
          error: (err: any) => {
            console.error(err);
            Swal.fire('Error', 'No se pudo eliminar el servicio', 'error');
          }
        });
      }
    });
  }
}