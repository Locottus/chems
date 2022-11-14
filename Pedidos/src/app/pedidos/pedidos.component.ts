import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedido: FormGroup = new FormGroup({});;

  autenticado: boolean = false;
  /**
  * observable to refresh the data when the modal updates.
  */
  dataChange$ = this.servicio.subjectObservable$.subscribe(async (loginStatus) => {
    this.autenticado = loginStatus;
  });

  constructor(
    private matDialog: MatDialog,
    private servicio: ServiciosService,
  ) { }

  ngOnInit(): void {
    //this.openDialog();
    
  }

  openDialog() {
    this.matDialog.open(LoginModalComponent, { disableClose: true });
  }

  onSubmit(f:NgForm) { 
    console.log(f);
  }

  onLogout(){
    this.autenticado = false;
    this.openDialog();    
  }

}
