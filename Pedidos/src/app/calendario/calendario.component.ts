import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { DetallePedido } from '../interfaces/DetallePedido';
import { MostrarPedidoComponent } from '../pedidos/componentes/mostrar-pedido/mostrar-pedido.component';
import { CalendarioService } from '../servicios/calendario.service';
import { ServiciosService } from '../servicios/servicios.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit, AfterViewInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarApi: any;
  calendarOptions: CalendarOptions;
  autenticado: boolean = false;
  /**
  * observable to refresh the data when the modal updates.
  */
  dataLogin$ = this.servicio.subjectObservable$.subscribe(async (loginStatus) => {
    this.autenticado = loginStatus;
    if (!this.autenticado) {
      this.servicio.navegaOrigen();
    }
  });

  /**
* observable to refresh the data when the modal updates.
*/
  dataChange$ = this.servicio.subjectObservable$.subscribe(async (loginStatus) => {
    this.autenticado = loginStatus;
  });

  /**
  * observable to refresh the data when the modal updates.
  */
  dataCalendar$ = this.calendarioService.subjectObservableCalendario$.subscribe(async (data) => {
    this.eventos = data;
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.onDateClick.bind(this),
      events: this.eventos,
      eventClick: (info: any) => {
        console.log('clicked', info.event._def);
        //alert(info.event._def.title);
        this.openDialog(info.event._def);
      }
    };
  });

  eventos: Array<DetallePedido> = [];


  constructor(
    private servicio: ServiciosService,
    private calendarioService: CalendarioService,
    public matDialog: MatDialog,

  ) { }



  ngOnInit() {
    const date = new Date();
    this.calendarioService.getPedidosCalendario(
      this.addDaysToDate(date, -15),
      this.addDaysToDate(date, +30));
  }


  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr)
  }


  onCalendarInit(e: any) {
    console.log('iniciando cal')
    console.log(e);
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }



  ngAfterViewInit() {
    this.calendarApi = this.calendarComponent.getApi();
    let currentDate = this.calendarApi.view.currentStart;
    let currentDate2 = this.calendarApi.view.intervalStart;
    console.log(currentDate);
    console.log(this.calendarApi);
  }

  openDialog(info: any) {
    this.matDialog.open(MostrarPedidoComponent,
      {
        disableClose: true,
        data: {
          pedido: info
        }
      });
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
