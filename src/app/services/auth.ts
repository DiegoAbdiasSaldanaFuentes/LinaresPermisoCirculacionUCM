import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse, UsuarioSesion } from '../models/permiso';
import { LogService } from './log';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private log = inject(LogService);
  private readonly API_URL = 'http://localhost:8000/api';

  // Solo guardamos la sesión activa en sessionStorage (las compras y pagos viven en la BD)
  usuarioActual = signal<UsuarioSesion | null>(this.leerUsuario());

  private leerUsuario(): UsuarioSesion | null {
    const raw = sessionStorage.getItem('usuario_linares');
    return raw ? JSON.parse(raw) : null;
  }

  login(correo: string, password: string): Observable<LoginResponse> {
    this.log.info('LOGIN', `Intento de inicio de sesión para ${correo}`);
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, { correo, password }).pipe(
      tap({
        next: (res) => {
          sessionStorage.setItem('token_linares', res.token);
          sessionStorage.setItem('usuario_linares', JSON.stringify(res.usuario));
          this.usuarioActual.set(res.usuario);
          this.log.info('LOGIN', `Sesión iniciada correctamente: ${res.usuario.correo} (${res.usuario.rol})`);
        },
        error: () => {
          this.log.error('LOGIN', `Credenciales rechazadas para ${correo}`);
        }
      })
    );
  }

  logout(): void {
    const correo = this.usuarioActual()?.correo || 'desconocido';
    sessionStorage.removeItem('token_linares');
    sessionStorage.removeItem('usuario_linares');
    this.usuarioActual.set(null);
    this.log.info('LOGOUT', `Sesión cerrada para ${correo}`);
  }

  obtenerToken(): string {
    return sessionStorage.getItem('token_linares') || '';
  }

  estaAutenticado(): boolean {
    return this.usuarioActual() !== null;
  }

  esAdmin(): boolean {
    return this.usuarioActual()?.rol === 'admin';
  }
}