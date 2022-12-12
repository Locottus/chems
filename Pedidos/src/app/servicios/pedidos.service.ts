import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constantes } from '../interfaces/Constantes';
import { DetallePedido } from '../interfaces/DetallePedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private httpClient: HttpClient,
    private constantes:Constantes,

  ) { }

  guardaPedido(pedido: DetallePedido) {
    this.httpClient.post( `${this.constantes.backend}pedidos-mes` , pedido).subscribe(data =>{
      alert(data);
    });
  }

}
