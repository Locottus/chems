import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }


  openDialog(){
    this.matDialog.open(LoginModalComponent);
  }
}
