import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Emitter } from '@fullcalendar/angular';
import { Usuario } from '../interfaces/Usuario';
import { ServiciosService } from '../servicios/servicios.service';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent  implements OnInit{

  //@Input() isCreation: boolean = false;
  //@Output() finishedCreation = new EventEmitter<any>();
  //isCreation: boolean = false;

  usr: string = "";
  pwd: string = "";
  errorLogin: boolean = true;
  errorMsg: string = "";

  autenticado: boolean = false;
  loginClick: boolean = false;

  /**
  * observable to refresh the data when the modal updates.
  */
  dataChange$ = this.servicio.subjectObservable$.subscribe(async (loginStatus) => {
    this.autenticado = loginStatus;
    if (this.autenticado ){
        this.dialogRef.close();
    } else if (this.autenticado && this.loginClick)
      this.showError('Ingrese Credenciales');
  });


  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
    public servicio: ServiciosService,
    private matDialog: MatDialog,
    private usuarioServicio: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }
  
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    /*if (this.autenticado){
      this.isCreation = this.data.isCreation;
    }*/
    //this.servicio.CheckPassword('Guatemala99^')
  }

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


  cerrar(){
    this.matDialog.closeAll();
    //this.finishedCreation.emit(true);
  }

  passwordReset(){
    //TODO
  }


}

