import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PermisoService } from '../../services/permiso';
import { VehiculoPermiso, ComprobantePago } from '../../models/permiso';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pago.html'
})
export class PagoComponent implements OnInit {
  private permisoService = inject(PermisoService);
  private router = inject(Router);

  // El vehículo iniciará como null hasta recibir los datos de la consulta
  vehiculo: VehiculoPermiso | null = null;
  tarjeta = { numero: '', titular: '', vencimiento: '', cvv: '' };

  ngOnInit(): void {
    // Captura el vehículo que seleccionó el usuario en la pantalla de consulta
    const navegacion = window.history.state;
    if (navegacion && navegacion.vehiculo) {
      this.vehiculo = navegacion.vehiculo;
    } else {
      // Si el usuario intenta entrar a /pago directamente sin haber consultado, lo manda a la consulta
      this.router.navigate(['/consulta']);
    }
  }

  procesarPago(): void {
    if (!this.vehiculo) return;

    const nuevoComprobante: ComprobantePago = {
      idTransaccion: 'TRX-' + Math.floor(100000 + Math.random() * 900000),
      fechaPago: new Date().toLocaleString(),
      patente: this.vehiculo.patente,
      rutPropietario: this.vehiculo.rutPropietario,
      monto: this.vehiculo.monto,
      municipalidad: this.vehiculo.municipalidad,
      estado: 'APROBADO'
    };

    // 1. Guarda el pago en el localStorage y actualiza el vehículo a PAGADO
    const exito = this.permisoService.registrarPago(nuevoComprobante);

    if (exito) {
      // 2. Redirige al comprobante enviando el objeto de la transacción
      this.router.navigate(['/comprobante'], { state: { comprobante: nuevoComprobante } });
    } else {
      alert('Ocurrió un error al procesar el pago en el sistema.');
    }
  }
}