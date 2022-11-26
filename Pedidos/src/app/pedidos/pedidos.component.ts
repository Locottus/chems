import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, FirstDataRenderedEvent, GridApi, RowGroupingDisplayType, CellValueChangedEvent } from 'ag-grid-community';
import Catalogo from '../catalogo';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { ServiciosService } from '../servicios/servicios.service';
import { DetallePedido } from './DetallePedido';
//https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit, AfterViewInit {

  @ViewChild("myInputFocus") myInputField: ElementRef;
  @ViewChild('topGrid') agGrid!: AgGridAngular;

  catalogo: Array<Catalogo> = [];
  creds:any;

  gridApi!: GridApi;
  gridColumnApi!: any;

  //grid settings
  gridWidth: string = "100%";
  gridHeight: string = "600px";
  public groupDisplayType: RowGroupingDisplayType = 'groupRows';

  detallePedido: DetallePedido = new DetallePedido();

  columnDefs: ColDef[] = [
    { field: 'Id', hide: false, maxWidth: 100, },
    { field: 'Nombre', hide: false },
    { field: 'Empresa', hide: false },
    { field: 'Presentacion', hide: false, editable: true, },
    { field: 'Cantidad', hide: false, editable: true, },
  ];

  //default settings for all columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };

  rowData: Array<Catalogo> = [];

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

  ngOnInit() {
    //this.rowData = this.servicio.getCatalogo();
    //this.creds = this.servicio.getCredentials();
    console.log(this.creds);
    //this.openDialog();
  }

  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }

  openDialog() {
    this.matDialog.open(LoginModalComponent, { disableClose: true });
  }

  onSubmit() {
    let msg: string = `\nNombre: ${this.detallePedido.Nombre}\nTelefono: ${this.detallePedido.Telefono}\nUbicacion: ${this.detallePedido.Ubicacion}\n`;
    let detalle: string = "";
    for (let i = 0; i < this.rowData.length; i++) {
      if (this.rowData[i].Cantidad > 0) {
        detalle = `Producto: ${this.rowData[i].Nombre} Presentacion: ${this.rowData[i].Presentacion} Cantidad: ${this.rowData[i].Cantidad}\n` + detalle;
      }
    }
    msg = msg + `\nNota:${this.detallePedido.Nota}\n${detalle}\n${this.detallePedido.Fecha}\n${this.detallePedido.Hora}\n`;
    console.log(msg);
    //SEND EVENT
    this.reset();
  }

  onLogout() {
    this.autenticado = false;
    this.reset();
    this.openDialog();
  }

  /**
 * event function for ag-grid
 * @param params 
 */
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  /**
   * event function for ag-grid
   * @param params 
   */
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.expandAll();
  }

  /**
 * detects changes in the object
 * @param e changed value event
 */
  onCellValueChanged(e: CellValueChangedEvent) {
  }

  reset() {
    this.detallePedido = new DetallePedido();
    //this.rowData = this.servicio.getCatalogo();
    for (let i = 0; i < this.rowData.length; i++) {
      this.rowData[i].Cantidad = this.rowData[i].Cantidad2;
      this.rowData[i].Presentacion = this.rowData[i].Presentacion2;
    }
    this.gridApi.setRowData(this.rowData);
    this.myInputField.nativeElement.focus();
  }

}
