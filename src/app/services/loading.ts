import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private peticionesActivas = 0;
  cargando = signal<boolean>(false);
  mensaje = signal<string>('Procesando solicitud...');

  mostrar(texto: string = 'Procesando solicitud...'): void {
    this.peticionesActivas++;
    this.mensaje.set(texto);
    this.cargando.set(true);
  }

  ocultar(): void {
    if (this.peticionesActivas > 0) {
      this.peticionesActivas--;
    }
    if (this.peticionesActivas === 0) {
      this.cargando.set(false);
    }
  }
}