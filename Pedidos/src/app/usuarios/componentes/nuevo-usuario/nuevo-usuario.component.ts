import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/Usuario';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  //@Input() isCreation: boolean = false;
  //@Output() finishedCreation = new EventEmitter<any>();
  isCreation: boolean = false;

  usr: string = "";
  pwd: string = "";
  pwd2: string = "";
  nombre: string = "";
  errorLogin: boolean = true;
  errorMsg: string = "";

  autenticado: boolean = false;
  loginClick: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<NuevoUsuarioComponent>,
    public servicio: ServiciosService,
    private matDialog: MatDialog,
    private usuarioServicio: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit(): void {
    this.isCreation = this.data.isCreation;
  }

  showError(msg: string) {
    this.errorLogin = false;
    this.errorMsg = msg;
    setTimeout(() => {
      this.errorLogin = true;
    }, 3000);
  }

  crearUsuario() {
    if (this.pwd.length < 8 || this.pwd2.length < 8) {
      this.showError('las contraseñas deben tener mas de 8 caracteres.');
    } else if (this.pwd != this.pwd2) {
      this.showError('las contraseñas no coinciden, pruebe de nuevo.');
    } else if (this.nombre == '') {
      this.showError('Ingrese nombre del usuario');
    } else if (this.usr == '') {
      this.showError('Ingrese email del usuario');
    } else {
      let usuario: Usuario = new Usuario();
      usuario.nombre = this.nombre;
      usuario.clave = this.pwd;
      usuario.activo = 1;
      usuario.rol = 0;
      usuario.usuario = this.usr;
      this.usuarioServicio.nuevoUsuario(usuario);
      this.cerrar();
    }
  }

  cerrar() {
    this.matDialog.closeAll();
    //this.finishedCreation.emit(true);
  }
}
