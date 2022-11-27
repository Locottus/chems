import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetallePedido } from '../interfaces/DetallePedido';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPedidosCalendario(fechaInicio: string, fechaFin: string) {
    return this.httpClient.get<Array<DetallePedido>>('http://localhost:3000/api/catalogo', {
      params: {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
      }
    }).subscribe();
  }


}
