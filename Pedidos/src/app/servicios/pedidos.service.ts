import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constantes } from '../interfaces/Constantes';
import { DetallePedido } from '../interfaces/DetallePedido';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private httpClient: HttpClient

  ) { }

  guardaPedido(pedido: DetallePedido) {
    return this.httpClient.post(`${Constantes.backend}pedidos-mes`, pedido).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        //Handle the error here
        alert(err.message);
        return throwError(() => err);
      })
    )
    .subscribe(data =>{
      console.log(data);
    });
  }

}
