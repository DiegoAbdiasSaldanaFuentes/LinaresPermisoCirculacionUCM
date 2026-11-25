import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisoService } from '../../services/permiso';
import { ComprobantePago } from '../../models/permiso';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.html'
})
export class HistorialComponent implements OnInit {
  private permisoService = inject(PermisoService);
  pagos: ComprobantePago[] = [];

  ngOnInit() {
    this.pagos = this.permisoService.obtenerHistorialPagos();
  }
}