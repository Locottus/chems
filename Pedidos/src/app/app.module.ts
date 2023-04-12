import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { MatSliderModule } from '@angular/material/slider';
import { PedidosComponent } from './pedidos/pedidos.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { CalendarioComponent } from './calendario/calendario.component';
import {MatMenuModule} from '@angular/material/menu';
import { NotFoundComponent } from './not-found/not-found.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { NuevoPedidoComponent } from './pedidos/componentes/nuevo-pedido/nuevo-pedido.component';
import { MostrarPedidoComponent } from './pedidos/componentes/mostrar-pedido/mostrar-pedido.component';
import { GridCalendarioComponent } from './calendario/componentes/grid-calendario/grid-calendario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './usuarios/componentes/nuevo-usuario/nuevo-usuario.component';
import { PwdValidationComponent } from './pwd-validation/pwd-validation.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])


@NgModule({
  declarations: [
    AppComponent,
    LoginModalComponent,
    PedidosComponent,
    MenuComponent,
    CalendarioComponent,
    NotFoundComponent,
    NuevoPedidoComponent,
    MostrarPedidoComponent,
    GridCalendarioComponent,
    UsuariosComponent,
    NuevoUsuarioComponent,
    PwdValidationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    MatSliderModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    AgGridModule,
    HttpClientModule,
    MatMenuModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
