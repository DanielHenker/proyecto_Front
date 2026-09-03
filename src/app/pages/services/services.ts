import { Component, OnInit } from '@angular/core';
import { Products } from '../../services/products';
import { Product } from '../../interfaces/products';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit {
  servicios: Product[] = [];
  mensaje: string = '';

  constructor(private productsService: Products) {}

  ngOnInit() {
    this.productsService.mostrarProductos().subscribe({
      next: (response: any) => {
        this.servicios = response.datos || [];
        if (this.servicios.length === 0) {
          this.mensaje = 'No hay servicios disponibles por el momento';
        }
      },
      error: () => {
        this.mensaje = 'Ocurrió un error al cargar los servicios';
      }
    });
  }
}