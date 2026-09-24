import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FotoGaleria {
  src: string;
  alt: string;
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  fotos: FotoGaleria[] = [
    {
      src: 'gallery/clinica-1.jpg',
      alt: 'Reconocimiento a la Dra. Edith Henker en el Programa Élite de Odontología Colsanitas',
      titulo: 'Reconocimiento a la excelencia',
      descripcion: 'Programa Élite de Odontología Colsanitas, distinción a la trayectoria y compromiso de la Dra. Edith Henker.'
    },
    {
      src: 'gallery/clinica-2.jpg',
      alt: 'Dra. Edith Henker realizando un procedimiento clínico',
      titulo: 'Atención cercana y profesional',
      descripcion: 'Cada procedimiento se realiza con el cuidado y la precisión que tu salud oral merece.'
    },
    {
      src: 'gallery/clinica-3.jpg',
      alt: 'Dra. Edith Henker en el consultorio de Rehabilitación · Arte',
      titulo: 'Un espacio pensado para ti',
      descripcion: 'Rehabilitación Oral · Arte: un consultorio dedicado a devolverte la confianza en tu sonrisa.'
    }
  ];

  indiceActual = signal(0);
  private intervalo?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.intervalo = setInterval(() => this.siguiente(), 5000);
  }

  ngOnDestroy() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  siguiente() {
    this.indiceActual.set((this.indiceActual() + 1) % this.fotos.length);
  }

  anterior() {
    this.indiceActual.set((this.indiceActual() - 1 + this.fotos.length) % this.fotos.length);
  }

  irA(indice: number) {
    this.indiceActual.set(indice);
  }
}
