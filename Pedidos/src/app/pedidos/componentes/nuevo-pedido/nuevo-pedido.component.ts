import { Component, OnInit } from '@angular/core';
import { Catalogo } from 'src/app/interfaces/Catalogo';
import { CatalogoService } from 'src/app/servicios/catalogo.service';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { ServiciosService } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.css']
})
export class NuevoPedidoComponent  {
  errorLogin: boolean = true;
  errorMsg: string = "";

  //autenticado: boolean = false;

  catalogo: Catalogo = new Catalogo();

  /**
  * observable to refresh the data when the modal updates.
  */
  /*dataChange$ = this.servicio.subjectObservable$.subscribe(async (loginStatus) => {
    this.autenticado = loginStatus;
    if (!this.autenticado){
      this.servicio.navegaOrigen();
    }

  });
*/
  constructor(
    private servicio: ServiciosService,
    private pedidosService: PedidosService,
    private catalogoService: CatalogoService
  ) { }

  agregarCatalogo() {
    this.catalogoService.insertaCatalogo(this.catalogo);
    alert('Actualizado');
    this.catalogo = new Catalogo();
  }

}
