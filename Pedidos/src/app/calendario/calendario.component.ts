import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { DetallePedido } from '../interfaces/DetallePedido';
import { MostrarPedidoComponent } from '../pedidos/componentes/mostrar-pedido/mostrar-pedido.component';
import { CalendarioService } from '../servicios/calendario.service';
import { ServiciosService } from '../servicios/servicios.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements  AfterViewInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarApi: any;
  calendarOptions: CalendarOptions;
  //autenticado: boolean = false;
  /**
  * observable to refresh the data when the modal updates.
  */
  /*dataLogin$ = this.servicio.subjectObservable$.subscribe(async (loginStatus) => {
    this.autenticado = loginStatus;
    if (!this.autenticado) {
      this.servicio.navegaOrigen();
    }
  });*/

  /**
* observable to refresh the data when the modal updates.
*/
/*  dataChange$ = this.servicio.subjectObservable$.subscribe(async (loginStatus) => {
    this.autenticado = loginStatus;
  });
*/
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
        //console.log('clicked', info.event._def);
        //alert(info.event._def.title);
        this.openDialog(info.event._def);
      },
      datesSet: this.handleDates.bind(this),
    };
  });

  eventos: Array<DetallePedido> = [];

  constructor(
    private servicio: ServiciosService,
    private calendarioService: CalendarioService,
    public matDialog: MatDialog,
    private router: Router,
  ) { }


  cargaFechasCalendario(dateStart: Date, dateEnd: Date) {
    //const date = new Date();
    this.calendarioService.getPedidosCalendario(
      this.calendarioService.addDaysToDate(dateStart, 0),
      this.calendarioService.addDaysToDate(dateEnd, 0));
  }


  handleDates(args: any) {
    //aqui puedo recargar el calendario
    let fechaStart = new Date(args.startStr.toString().split('T')[0]);
    let fechaEnd = new Date(args.endStr.toString().split('T')[0]);

    this.cargaFechasCalendario(fechaStart, fechaEnd);
  }

  onDateClick(res: any) {
    //alert('Clicked on date : ' + res.dateStr)
    //let fecha = this.calendarioService.getFormattedDate(res.dateStr);
    this.router.navigateByUrl(`/pedidos?fecha=${res.dateStr}`)
  }


  onCalendarInit(e: any) {
    //console.log(e);
  }

  handleDateClick(arg: any) {
    //alert('date click! ' + arg.dateStr)
  }



  ngAfterViewInit() {

    this.calendarApi = this.calendarComponent.getApi();
    let currentDate = this.calendarApi.view.currentStart;

    console.log(currentDate); // result: current calendar start date

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

}
