import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, FirstDataRenderedEvent, GridApi, RowGroupingDisplayType, CellValueChangedEvent } from 'ag-grid-community';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { ServiciosService } from '../servicios/servicios.service';
import { DetallePedido } from '../interfaces/DetallePedido';
import { Catalogo } from '../interfaces/Catalogo';
import { PedidosService } from '../servicios/pedidos.service';
import { CatalogoService } from '../servicios/catalogo.service';

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


  gridApi!: GridApi;
  gridColumnApi!: any;

  //grid settings
  gridWidth: string = "100%";
  gridHeight: string = "600px";
  public groupDisplayType: RowGroupingDisplayType = 'groupRows';

  detallePedido: DetallePedido = new DetallePedido();

  columnDefs: ColDef[] = [
    { field: 'id', hide: false, maxWidth: 100, },
    { field: 'nombre', hide: false },
    { field: 'empresa', hide: false },
    { field: 'presentacion', hide: false, editable: true, },
    { field: 'cantidad', hide: false, editable: true, },
    { field: 'precio', hide: true, editable: true, },

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
  dataLogin$ = this.servicio.subjectObservable$.subscribe(async (loginStatus) => {
    this.autenticado = loginStatus;
  });

  dataCatalogo$ = this.catalogoService.subjectObservableCatalogo$.subscribe(async (data) => {
    this.rowData = data;
  })

  constructor(
    private matDialog: MatDialog,
    private servicio: ServiciosService,
    private pedidosService: PedidosService,
    private catalogoService: CatalogoService
  ) { }

  ngOnInit() {
    this.getCatalog();
  }

  getCatalog() {
    this.catalogoService.getCatalogo();
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
      if (this.rowData[i].cantidad > 0) {
        detalle = `Producto: ${this.rowData[i].nombre} Presentacion: ${this.rowData[i].presentacion} Cantidad: ${this.rowData[i].cantidad}\n` + detalle;
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
    this.getCatalog();
  }

}
