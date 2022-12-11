import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetallePedido } from '../interfaces/DetallePedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private httpClient: HttpClient

  ) { }

  guardaPedido(pedido: DetallePedido) {
    this.httpClient.post('http://localhost:3000/api/pedidos-mes', pedido).subscribe(data =>{
      alert(data);
    });
  }

}
