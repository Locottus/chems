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

  autenticado: boolean = false;

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
      
      console.log(this.eventos);
    });

  eventos:Array<DetallePedido> = [];

  //https://fullcalendar.io/docs/angular
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!

    events: this.eventos,
    //events: [{"title":"event1","start":"2022-11-12 13:00:00","end":"2022-11-12 16:00:00"},
    //{"title":"event2","start":"2022-11-28 13:00:00","end":"2022-11-28 15:00:00"}],

    eventClick: function (info: any) {
      console.log(info.event);
      alert('Event: ' + info.event.title + ' ' + info.event.extendedProps.detalle);
      //alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      //alert('View: ' + info.view.type);
    }
  };

  onCalendarInit(e: any) {
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
