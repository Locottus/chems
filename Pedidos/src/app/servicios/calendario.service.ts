import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Constantes } from '../interfaces/Constantes';
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
    return this.httpClient.get<Array<DetallePedido>>(`${Constantes.backend}pedidos-mes`, {
      params: {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
      }
    }).subscribe(
      data => {
        this.pedidos = data;
        this.calendarioEmitter(this.pedidos);
      },err=>{
        alert(err.message);
      }
    );
  }

  private taskDate(dateMilli: string) {
    var d = (new Date(dateMilli) + '').split(' ');
    d[2] = d[2] + ',';
    return [d[0], d[1], d[2], d[3]].join(' ');
  }

  addDaysToDate(date: Date, days: number): string {
    date.setDate(date.getDate() + days);
    return this.taskDate(date.toString());
  }


  getFormattedDate(dateStr: string) {  
    let date = new Date(dateStr);
    
    let year = date.getFullYear();
  
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return `${year}-${month}-${day}`;
  }

  getCurrentHour(){
    const d = new Date();
    let hour = d.getHours();
    let minutes = d.getMinutes();//
    return `${hour.toString().padStart(2 ,"0")}:${minutes.toString().padStart(2 ,"0")}`;
  }

  convertDateToYYYYMMDD(date:Date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
  
    return year + '-' + month + '-' + day;
  }

}
