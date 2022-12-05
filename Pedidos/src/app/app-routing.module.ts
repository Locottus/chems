import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { GridCalendarioComponent } from './calendario/componentes/grid-calendario/grid-calendario.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NuevoPedidoComponent } from './pedidos/componentes/nuevo-pedido/nuevo-pedido.component';
import { PedidosComponent } from './pedidos/pedidos.component';

const routes: Routes = [
  { path: 'calendario', component: CalendarioComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'nuevo-producto', component: NuevoPedidoComponent },
  { path: 'grid-calendario', component: GridCalendarioComponent },
  { path: '', component: MenuComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
