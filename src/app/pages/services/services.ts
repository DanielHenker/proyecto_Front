import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Product } from '../../interfaces/products';

@Component({
  selector: 'app-services',
  imports: [CommonModule, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit {
  private productsService = inject(ProductsService);

  servicios = signal<Product[]>([]);
  mensaje = signal<string>('');

  ngOnInit() {
    this.productsService.mostrarProductos().subscribe({
      next: (response: any) => {
        const datos = response.datos || [];
        this.servicios.set(datos);
        if (datos.length === 0) {
          this.mensaje.set('No hay servicios disponibles por el momento');
        }
      },
      error: () => {
        this.mensaje.set('Ocurrió un error al cargar los servicios');
      }
    });
  }
}
