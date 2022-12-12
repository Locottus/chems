import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constantes } from '../interfaces/Constantes';
import { DetallePedido } from '../interfaces/DetallePedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private httpClient: HttpClient

  ) { }

  guardaPedido(pedido: DetallePedido) {
    return this.httpClient.post(`${Constantes.backend}pedidos-mes`, pedido).subscribe();
  }

}
