import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../interfaces/Usuario';
import { ServiciosService } from '../servicios/servicios.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {

  @Input() isCreation: boolean = false;

  usr: string = "";
  pwd: string = "";
  pwd2: string = "";
  nombre: string = "";
  errorLogin: boolean = true;
  errorMsg: string = "";

  autenticado: boolean = false;
  /**
  * observable to refresh the data when the modal updates.
  */
  dataChange$ = this.servicio.subjectObservable$.subscribe(async (loginStatus) => {
    this.autenticado = loginStatus;
    if (this.autenticado)
      this.dialogRef.close();
    else
      this.showError('Ingrese Credenciales');

  });


  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
    public servicio: ServiciosService,
    private matDialog: MatDialog,
  ) { }

  validar() {
    this.servicio.login(this.usr.toLowerCase(), this.pwd);

  }

  showError(msg: string) {
    this.errorLogin = false;
    this.errorMsg = msg;
    setTimeout(() => {
      this.errorLogin = true;
    }, 3000);
  }

  crearUsuario() {
    if (this.pwd != this.pwd2) {
      //alert('las contraseñas no coinciden, pruebe de nuevo.');
      this.showError('las contraseñas no coinciden, pruebe de nuevo.');
    } else if (this.nombre == ''){
      this.showError('Ingrese nombre del usuario');
    }else if (this.usr == ''){
      this.showError('Ingrese email del usuario');
    }else{
      let usuario: Usuario = new Usuario();
      usuario.nombre = this.nombre;
      usuario.clave = this.pwd;
      usuario.activo = 1;
      usuario.rol = 0;
      usuario.usuario = this.usr;
      this.servicio.nuevoUsuario(usuario);
    }
  }

  cerrar(){
    this.matDialog.closeAll();
  }
}

