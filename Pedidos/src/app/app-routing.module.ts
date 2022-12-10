import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CalendarioComponent } from './calendario/calendario.component';
import { GridCalendarioComponent } from './calendario/componentes/grid-calendario/grid-calendario.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NuevoPedidoComponent } from './pedidos/componentes/nuevo-pedido/nuevo-pedido.component';
import { PedidosComponent } from './pedidos/pedidos.component';

const routes: Routes = [
  { path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuard] },
  { path: 'pedidos', component: PedidosComponent, canActivate: [AuthGuard] },
  { path: 'nuevo-producto', component: NuevoPedidoComponent, canActivate: [AuthGuard] },
  { path: 'grid-calendario', component: GridCalendarioComponent, canActivate: [AuthGuard] },
  { path: '', component: MenuComponent },
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
