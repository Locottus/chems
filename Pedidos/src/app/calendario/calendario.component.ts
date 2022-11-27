import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
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

  e = [
    { title: 'fulano 1', date: '2022-11-01', detalle: 'detalle 1' },
    { title: 'event 0', date: '2022-11-01', detalle: 'detalle 0 ' },
    { title: 'event 44', date: '2022-11-01', detalle: 'detalle 44' },
    { title: 'event 2', date: '2022-11-02', detalle: 'detalle 2' }
  ];
  //https://fullcalendar.io/docs/angular
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!

    events: this.e ,

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
  }

}
