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
    if (this.mensaje.telefono == null || this.mensaje.telefono.length < 8) {
      alert('Ingrese un numero de telefono valido para que podamos contactarlo');
    } else if (this.mensaje.email == null || this.mensaje.email.length == 0) {
      alert('Ingrese un correo electronico para que podamos contactarlo');
    } else if (this.mensaje.nombre == null || this.mensaje.nombre.length == 0) {
      alert('Ingrese un nombre para que podamos contactarlo');
    } else if (this.mensaje.mensaje == null || this.mensaje.mensaje.length == 0) {
      alert('Ingrese un mensaje para que podamos responder');
    }
    else {
      this.servicio.enviarEmail(this.mensaje).subscribe(data => {
        alert('Mensaje Enviado, Pronto estaremos contactandole.');
        this.mensaje = new Mensaje;
      });
    }
  }
}
