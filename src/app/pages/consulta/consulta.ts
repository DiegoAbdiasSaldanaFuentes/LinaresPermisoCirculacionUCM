import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PermisoService } from '../../services/permiso';
import { VehiculoPermiso } from '../../models/permiso';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta.html'
})
export class ConsultaComponent {
  private permisoService = inject(PermisoService);
  private router = inject(Router);

  patenteBusqueda: string = '';
  vehiculoEncontrado: VehiculoPermiso | null = null;
  mensajeError: string = '';

  buscarVehiculo() {
    this.mensajeError = '';
    this.vehiculoEncontrado = null;

    if (!this.patenteBusqueda.trim()) {
      this.mensajeError = 'Por favor, ingrese una patente válida.';
      return;
    }

    const resultado = this.permisoService.buscarPorPatente(this.patenteBusqueda);
    if (resultado) {
      this.vehiculoEncontrado = resultado;
    } else {
      this.mensajeError = 'No se encontró ningún vehículo registrado con esa patente.';
    }
  }

  irAlPago(vehiculo: VehiculoPermiso) {
    // Envía el vehículo seleccionado hacia la pasarela de pago mediante state
    this.router.navigate(['/pago'], { state: { vehiculo } });
  }
}