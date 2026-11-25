import { Injectable } from '@angular/core';
import { VehiculoPermiso, ComprobantePago } from '../models/permiso';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  private readonly STORAGE_VEHICULOS = 'vehiculos_linares';
  private readonly STORAGE_PAGOS = 'pagos_linares';

  constructor() {
    this.inicializarDatos();
  }

  private getVehiculos(): VehiculoPermiso[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_VEHICULOS) || '[]');
  }

  private setVehiculos(vehiculos: VehiculoPermiso[]): void {
    localStorage.setItem(this.STORAGE_VEHICULOS, JSON.stringify(vehiculos));
  }

  private getPagos(): ComprobantePago[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_PAGOS) || '[]');
  }

  private setPagos(pagos: ComprobantePago[]): void {
    localStorage.setItem(this.STORAGE_PAGOS, JSON.stringify(pagos));
  }

  inicializarDatos(): void {
    if (this.getVehiculos().length === 0) {
      const vehiculosIniciales: VehiculoPermiso[] = [
        { patente: 'ABCD12', rutPropietario: '12345678-9', nombrePropietario: 'Juan Pérez', marca: 'Toyota', modelo: 'Yaris', anio: 2020, monto: 54200, estado: 'PENDIENTE', vigencia: 2026, municipalidad: 'Ilustre Municipalidad de Linares' },
        { patente: 'XYZW99', rutPropietario: '98765432-1', nombrePropietario: 'María Gómez', marca: 'Chevrolet', modelo: 'Sail', anio: 2022, monto: 61500, estado: 'PENDIENTE', vigencia: 2026, municipalidad: 'Ilustre Municipalidad de Linares' }
      ];
      this.setVehiculos(vehiculosIniciales);
    }
  }

  buscarPorPatente(patente: string): VehiculoPermiso | null {
    const vehiculos = this.getVehiculos();
    const encontrado = vehiculos.find(v => v.patente.toUpperCase() === patente.toUpperCase());
    return encontrado || null;
  }

  registrarPago(comprobante: ComprobantePago): boolean {
    try {
      const pagos = this.getPagos();
      const vehiculos = this.getVehiculos();
      
      const index = vehiculos.findIndex(v => v.patente.toUpperCase() === comprobante.patente.toUpperCase());
      if (index === -1) return false; 
      
      vehiculos[index].estado = 'PAGADO';
      pagos.push(comprobante);

      this.setVehiculos(vehiculos);
      this.setPagos(pagos);
      
      return true;
    } catch (e) {
      console.error('Error al procesar el almacenamiento del pago', e);
      return false;
    }
  }

  obtenerHistorialPagos(): ComprobantePago[] {
    return this.getPagos();
  }
}