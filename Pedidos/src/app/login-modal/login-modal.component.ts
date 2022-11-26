import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiciosService } from '../servicios/servicios.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent  {

  usr: string = "";
  pwd: string = "";

  errorLogin: boolean = true;
  errorMsg: string = "";

  autenticado: boolean = false;
  /**
  * observable to refresh the data when the modal updates.
  */
  dataChange$ = this.servicio.subjectObservable$.subscribe(async (loginStatus) => {
    this.autenticado = loginStatus;
  });


  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
    public servicio: ServiciosService
  ) { }

  validar() {
    this.servicio.login(this.usr.toLowerCase(),this.pwd);

    if (this.autenticado)
      this.dialogRef.close();
    else
      this.showError('credenciales incorrectas');
  }

  showError(msg: string) {
    this.errorLogin = false;
    this.errorMsg = msg;
    setTimeout(() => {
      this.errorLogin = true;
    }, 3000);
  }
}

