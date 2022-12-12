import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  dataChange$ = this.servicio.subjectObservable$.subscribe(async (loginStatus) => {
    this.autenticado = loginStatus;

    if (!this.autenticado){
      this.openDialog();
    }
  });

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
