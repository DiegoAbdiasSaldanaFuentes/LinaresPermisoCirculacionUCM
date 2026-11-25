export interface Permiso {}
export interface VehiculoPermiso {
  patente: string;
  rutPropietario: string;
  nombrePropietario: string;
  marca: string;
  modelo: string;
  anio: number;
  monto: number;
  estado: 'PAGADO' | 'PENDIENTE';
  vigencia: number;
  municipalidad: string;
}

export interface ComprobantePago {
  idTransaccion: string;
  fechaPago: string;
  patente: string;
  rutPropietario: string;
  monto: number;
  municipalidad: string;
  estado: 'APROBADO';
}