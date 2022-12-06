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
        this.calendarioEmitter(this.pedidos);
      }
    );
  }

  taskDate(dateMilli: string) {
    var d = (new Date(dateMilli) + '').split(' ');
    d[2] = d[2] + ',';
    return [d[0], d[1], d[2], d[3]].join(' ');
  }

  addDaysToDate(date: Date, days: number): string {
    date.setDate(date.getDate() + days);
    return this.taskDate(date.toString());
  }


}
