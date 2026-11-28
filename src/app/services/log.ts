import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface RegistroLog {
  fecha: string;
  nivel: 'INFO' | 'WARN' | 'ERROR';
  operacion: string;
  contexto: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8000/api';
  historial: RegistroLog[] = [];

  private registrar(nivel: 'INFO' | 'WARN' | 'ERROR', operacion: string, contexto: string): void {
    const entrada: RegistroLog = {
      fecha: new Date().toLocaleString('es-CL'),
      nivel,
      operacion,
      contexto
    };
    this.historial.unshift(entrada);

    const texto = `[${entrada.fecha}] [${nivel}] (${operacion}) ${contexto}`;
    if (nivel === 'ERROR') console.error(texto);
    else if (nivel === 'WARN') console.warn(texto);
    else console.info(texto);
  }

  info(operacion: string, contexto: string): void {
    this.registrar('INFO', operacion, contexto);
  }

  warn(operacion: string, contexto: string): void {
    this.registrar('WARN', operacion, contexto);
  }

  error(operacion: string, contexto: string): void {
    this.registrar('ERROR', operacion, contexto);
  }

  // Prueba ping/pong exigida como evidencia en la pauta
  probarPing(): Observable<any> {
    this.info('PING', 'Consultando disponibilidad de API FastAPI...');
    return this.http.get(`${this.API_URL}/ping`).pipe(
      tap({
        next: (res: any) => this.info('PING', `Respuesta recibida: ${res?.message || 'pong'}`),
        error: () => this.error('PING', 'No se pudo conectar con la API FastAPI')
      })
    );
  }
}