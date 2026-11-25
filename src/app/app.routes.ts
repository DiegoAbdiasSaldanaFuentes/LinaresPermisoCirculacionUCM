import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio';
import { ConsultaComponent } from './pages/consulta/consulta';
import { PagoComponent } from './pages/pago/pago';
import { ComprobanteComponent } from './pages/comprobante/comprobante';
import { HistorialComponent } from './pages/historial/historial';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'consulta', component: ConsultaComponent },
  { path: 'pago', component: PagoComponent },
  { path: 'comprobante', component: ComprobanteComponent },
  { path: 'historial', component: HistorialComponent },
  { path: '**', redirectTo: '' }
];