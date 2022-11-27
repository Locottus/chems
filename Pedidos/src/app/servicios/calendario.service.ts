import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DetallePedido } from '../interfaces/DetallePedido';


@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  pedidos: Array<DetallePedido> = []
  private behaviorSubjectCalendario = new BehaviorSubject<Array<DetallePedido>>(this.pedidos);
  subjectObservableCalendario$ = this.behaviorSubjectCalendario.asObservable();
  
  constructor(
    private httpClient: HttpClient,
    
  ) { }

  calendarioEmitter(p: Array<DetallePedido>) {
    this.pedidos = p;
    this.behaviorSubjectCalendario.next(this.pedidos);
  }

  getPedidosCalendario(fechaInicio: string, fechaFin: string) {
    //console.log('get pedidos');
    return this.httpClient.get<Array<DetallePedido>>('http://localhost:3000/api/pedidos-mes', {
      params: {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
      }
    }).subscribe(
      data => {
        this.pedidos = data;
        this.pedidos.forEach(e => {
          let tmp = e.date.split('T')[0];
          //console.log(e.date);
          //console.log(tmp)
          //console.log( tmp.split('-')[2] + '/' + tmp.split('-')[1]  + '/' +tmp.split('-')[0] );
          e.date = tmp.split('-')[1] + '/' + tmp.split('-')[2] + '/' + tmp.split('-')[0];

        })
        this.calendarioEmitter(this.pedidos);
      }
    );
  }


}
