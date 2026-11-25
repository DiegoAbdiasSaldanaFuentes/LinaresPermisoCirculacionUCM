import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ComprobantePago } from '../../models/permiso';

@Component({
  selector: 'app-comprobante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comprobante.html'
})
export class ComprobanteComponent implements OnInit {
  private router = inject(Router);
  comprobante: ComprobantePago | null = null;

  ngOnInit(): void {
    // Leemos el estado desde history.state que persiste tras la navegación
    const state = window.history.state;
    if (state && state.comprobante) {
      this.comprobante = state.comprobante;
    } else {
      // Si no hay datos de transacción, vuelve al inicio
      this.router.navigate(['/']);
    }
  }

  imprimir(): void {
    window.print();
  }
}