import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, FirstDataRenderedEvent, GridApi, RowGroupingDisplayType, CellValueChangedEvent } from 'ag-grid-community';
import Catalogo from '../catalogo';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { ServiciosService } from '../servicios.service';


@Component({
  selector: 'pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  @ViewChild('f') forma: NgForm | undefined;
  @ViewChild('topGrid') agGrid!: AgGridAngular;

  pedido: FormGroup = new FormGroup({});;
  autenticado: boolean = false;
  catalogo: Array<Catalogo> = [];

  gridApi!: GridApi;
  gridColumnApi!: any;

  //grid settings
  gridWidth: string = "100%";
  gridHeight: string = "600px";
  public groupDisplayType: RowGroupingDisplayType = 'groupRows';


  columnDefs: ColDef[] = [
    { field: 'Id', hide: false, maxWidth: 100, },
    { field: 'Nombre', hide: false },
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
    this.rowData = this.servicio.getJSON();
    //console.log(this.rowData);
  }

  openDialog() {
    this.matDialog.open(LoginModalComponent, { disableClose: true });
  }

  onSubmit() {
    console.log(this.rowData);
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

}
