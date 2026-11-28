export interface UsuarioSesion {
  id: number;
  rut: string;
  nombre: string;
  correo: string;
  rol: 'cliente' | 'admin';
}

export interface LoginResponse {
  token: string;
  usuario: UsuarioSesion;
}

export interface Vehiculo {
  id: number;
  cliente_id: number;
  municipalidad_id: number;
  patente: string;
  tipo: string;
  marca: string;
  modelo: string;
  anio: number;
  estado_permiso: 'PENDIENTE' | 'PARCIALMENTE_PAGADO' | 'PAGADO';
  municipalidad?: string;
}

export interface Cliente {
  id: number;
  rut: string;
  nombre: string;
  correo: string;
  telefono: string;
  vehiculos?: Vehiculo[];
}

export interface TarifaPermiso {
  id?: number;
  municipalidad_id: number;
  periodo: number;
  tipo_vehiculo: string;
  valor_base: number;
  activo: boolean;
}

export interface CargoAdicional {
  id?: number;
  municipalidad_id: number;
  descripcion: string;
  tipo_calculo: 'MONTO' | 'PORCENTAJE';
  valor: number;
  vigencia_desde: string;
  vigencia_hasta: string;
  activo: boolean;
}

export interface DetalleCotizacionVehiculo {
  vehiculo_id: number;
  patente: string;
  marca?: string;
  modelo?: string;
  valor_base: number;
  cargos: number;
  descuentos: number;
  total_vehiculo: number;
}

export interface CotizacionResponse {
  cliente_id: number;
  periodo: number;
  detalle: DetalleCotizacionVehiculo[];
  monto_total: number;
  cuota_1: number;
  cuota_2: number;
}

export interface Cuota {
  id: number;
  compra_id: number;
  numero_cuota: number;
  monto: number;
  estado: 'PENDIENTE' | 'PAGADO';
  fecha_pago: string | null;
}

export interface Compra {
  id: number;
  cliente_id: number;
  municipalidad_id: number;
  periodo: number;
  modalidad: 'TOTAL' | 'DOS_CUOTAS';
  monto_total: number;
  monto_pagado: number;
  saldo_pendiente: number;
  estado: 'PENDIENTE_PAGO' | 'PARCIALMENTE_PAGADO' | 'PAGADO';
  fecha_creacion: string;
  cuotas?: Cuota[];
  detalles?: {
    patente_snapshot: string;
    valor_base_snapshot: number;
    cargos_snapshot: number;
    total_vehiculo_snapshot: number;
  }[];
  comprobantes?: Comprobante[];
}

export interface Comprobante {
  id: number;
  folio: string;
  compra_id: number;
  cuota_id?: number | null;
  numero_cuota: number; // 0 = pago total, 1 o 2 = cuota
  monto_pagado: number;
  modalidad: 'TOTAL' | 'DOS_CUOTAS';
  fecha_pago: string;
  municipalidad?: string;
  cliente_nombre?: string;
  cliente_rut?: string;
  periodo?: number;
  monto_total_compra?: number;
  saldo_pendiente?: number;
  vehiculos?: {
    patente: string;
    valor_base: number;
    cargos: number;
    total: number;
  }[];
}