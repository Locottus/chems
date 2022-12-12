import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/Usuario';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { ServiciosService } from '../servicios/servicios.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements  AfterViewInit {

  
  autenticado: boolean = false;
  /**
  * observable to refresh the data when the modal updates.
  */
  dataChangeLogin$ = this.servicio.subjectObservable$.subscribe(async (loginStatus) => {
    this.autenticado = loginStatus;

    if (!this.autenticado){
      this.openDialog();
    }
  });

  usuario: Usuario = new Usuario();
  dataUsuario$ = this.servicio.subjectObservableUsuario$.subscribe(async (usrData)=>{
    this.usuario = usrData;
    console.log(this.usuario);
  })

  constructor( 
    private matDialog: MatDialog,
    private servicio: ServiciosService,
    private router: Router
    ) { }
  
  
  ngAfterViewInit() {
    if (!this.autenticado){
      this.openDialog();
    }
    
  }

  openDialog() {
    this.matDialog.open(LoginModalComponent, { disableClose: true });
  }


  //https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/
  //https://www.geeksforgeeks.org/how-to-add-background-color-to-a-div-in-bootstrap/
  navegacion(ruta:string){
    switch (ruta){
      case 'calendario':
        this.router.navigateByUrl('/calendario')
        break;
      case 'pedidos':
        this.router.navigateByUrl('/pedidos')
        break;
      case 'nuevo-producto':
        this.router.navigateByUrl('/nuevo-producto')
        break;
      case 'historicos':
        this.router.navigateByUrl('/grid-calendario')
        break;
      case 'usrs':
      this.router.navigateByUrl('/usuarios')
      break; 
    }
  }

  salir(){
    this.servicio.logout();
  }

}
