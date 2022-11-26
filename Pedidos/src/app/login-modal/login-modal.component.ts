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

  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
    public servicios: ServiciosService
  ) { }

  validar() {
    let successLogin: boolean = false;
    if ('especiaschemita@gmail.com' === this.usr.toLowerCase() && 'Esp2022!' === this.pwd) {
      successLogin = true;
      this.dialogRef.close();
    } else {
      successLogin = false;
      this.showError('credenciales incorrectas');
    }
    this.servicios.loginStatus(successLogin);
  }

  showError(msg: string) {
    this.errorLogin = false;
    this.errorMsg = msg;
    setTimeout(() => {
      this.errorLogin = true;
    }, 3000);
  }
}

