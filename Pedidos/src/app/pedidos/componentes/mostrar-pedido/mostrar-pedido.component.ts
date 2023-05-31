import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mostrar-pedido',
  templateUrl: './mostrar-pedido.component.html',
  styleUrls: ['./mostrar-pedido.component.css']
})
export class MostrarPedidoComponent implements OnInit {

  pedido: any;
  lista: Array<string> = [];
  fileUrl: any;
  fileReady: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MostrarPedidoComponent>,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.pedido = this.data.pedido;
    this.lista = this.pedido.extendedProps.detalle.toString().split('\n');

    this.saveFile();
    this.fileReady = true;

  }

  cerrarPedido() {
    //this.cerrar.emit(true);
    this.dialogRef.close();
  }

  imprimir() {
    window.print();
  }

  saveFile() {
    let fix: any = "DETALLE DE PEDIDO\n";
    this.lista.forEach(e => {
      if (e.length > 0) {
        fix = fix + e + '\n';
      }
    })
    const data: any = fix;
    const blob = new Blob([data], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

  }

}
