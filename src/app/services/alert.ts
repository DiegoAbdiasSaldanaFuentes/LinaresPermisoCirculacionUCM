import { Injectable, signal } from '@angular/core';

export interface Alerta {
  tipo: 'success' | 'danger' | 'warning' | 'info';
  texto: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertaActual = signal<Alerta | null>(null);

  mostrar(tipo: 'success' | 'danger' | 'warning' | 'info', texto: string): void {
    this.alertaActual.set({ tipo, texto });
  }

  exito(texto: string): void {
    this.mostrar('success', texto);
  }

  error(texto: string): void {
    this.mostrar('danger', texto);
  }

  advertencia(texto: string): void {
    this.mostrar('warning', texto);
  }

  info(texto: string): void {
    this.mostrar('info', texto);
  }

  cerrar(): void {
    this.alertaActual.set(null);
  }
}