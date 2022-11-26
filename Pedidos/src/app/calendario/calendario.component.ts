import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { ServiciosService } from '../servicios/servicios.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  autenticado: boolean = false;
  /**
  * observable to refresh the data when the modal updates.
  */
  dataChange$ = this.servicio.subjectObservable$.subscribe(async (loginStatus) => {
    this.autenticado = loginStatus;
  });

  //https://fullcalendar.io/docs/angular
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2022-11-01' },
      { title: 'event 0', date: '2022-11-01' },
      { title: 'event 44', date: '2022-11-01' },
      { title: 'event 2', date: '2022-11-02' }
    ]
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

  constructor(
    private servicio: ServiciosService,
  ) { }


  ngOnInit(): void {
  }

  async login() {
    this.servicio.login('herlich@gmail.com', 'password');
  }

}
