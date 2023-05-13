import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../dto/mensaje';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.css']
})
export class EnviarMensajeComponent implements OnInit {
  mensaje: Mensaje = new Mensaje;


  constructor(
    private servicio: ServiciosService,
  ) { }


  ngOnInit() {
  }

  enviarEmail() {
    console.log('enviando mensaje');
    console.log(this.mensaje);
    this.servicio.enviarEmail(this.mensaje).subscribe(data => {
      alert(data);
      this.mensaje = new Mensaje;
    });

  }
}
