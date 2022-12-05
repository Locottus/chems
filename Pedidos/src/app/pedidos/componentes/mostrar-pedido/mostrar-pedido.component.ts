import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-mostrar-pedido',
  templateUrl: './mostrar-pedido.component.html',
  styleUrls: ['./mostrar-pedido.component.css']
})
export class MostrarPedidoComponent implements OnInit {

  pedido:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MostrarPedidoComponent>,
  ) { }

  ngOnInit() {
    this.pedido = this.data.pedido;
  }

  cerrarPedido(){
    //this.cerrar.emit(true);
    this.dialogRef.close();
  }

}