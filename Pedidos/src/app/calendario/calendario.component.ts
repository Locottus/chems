import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { DetallePedido } from '../interfaces/DetallePedido';
import { CalendarioService } from '../servicios/calendario.service';
import { ServiciosService } from '../servicios/servicios.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions;
  autenticado: boolean = false;

  onDateClick(res:any) {
    alert('Clicked on date : ' + res.dateStr)
  }


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
      };
    });

  eventos:Array<DetallePedido> = [];

  onCalendarInit(e: any) {
    console.log('iniciando cal')
    console.log(e);
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

  constructor(
    private servicio: ServiciosService,
    private calendarioService: CalendarioService,

  ) { }


  ngOnInit() {
    this.calendarioService.getPedidosCalendario('2020-01-01','2023-12-31');
     
  }

}
