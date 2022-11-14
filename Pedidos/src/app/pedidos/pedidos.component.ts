import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('f') forma: NgForm | undefined;
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

  onSubmit() {
    if (this.forma?.control.status === "VALID") {

    } else {
      alert('No se han ingresado todos los campos');
    }
    console.log(this.forma);
  }

  onLogout() {
    this.autenticado = false;
    this.openDialog();
  }

}
