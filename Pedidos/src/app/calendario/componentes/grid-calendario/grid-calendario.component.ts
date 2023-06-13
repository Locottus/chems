import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent, RowGroupingDisplayType } from 'ag-grid-community';
import { DetallePedido } from 'src/app/interfaces/DetallePedido';
import { CalendarioService } from 'src/app/servicios/calendario.service';
import { ServiciosService } from 'src/app/servicios/servicios.service';


@Component({
  selector: 'app-grid-calendario',
  templateUrl: './grid-calendario.component.html',
  styleUrls: ['./grid-calendario.component.css']
})
export class GridCalendarioComponent {
  @ViewChild("myInputFocus") myInputField: ElementRef;
  @ViewChild('topGrid') agGrid!: AgGridAngular;

  gridApi!: GridApi;
  gridColumnApi!: any;

  //grid settings
  gridWidth: string = "100%";
  gridHeight: string = "600px";
  public groupDisplayType: RowGroupingDisplayType = 'groupRows';


  columnDefs: ColDef[] = [
    { field: 'id', hide: false, maxWidth: 100, },
    { field: 'title', hide: false,  },
    { field: 'detalle', hide: false, editable: true },
    { field: 'nombre', hide: false, editable: true },
    { field: 'telefono', hide: false, editable: true },
    { field: 'ubicacion', hide: false, editable: true },
    { field: 'nota', hide: false, editable: true },
    { field: 'hora', hide: false, editable: true },
    { field: 'recordatorio', hide: false, editable: true },
    { field: 'estado', hide: false, editable: true },    
    { field: 'date', hide: false,editable: true },    
    { field: 'total', hide: false,editable: true },
    { field: 'detallejson', hide: false, },
  ];

  //default settings for all columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };

  rowData: Array<DetallePedido> = [];

  fechaInicio: string = "";
  fechaFin: string = "";


  dataCalendar$ = this.calendarioService.subjectObservableCalendario$.subscribe(async (data) => {
    this.rowData = data;
  });


  constructor(
    private servicio: ServiciosService,
    private calendarioService: CalendarioService,
    public matDialog: MatDialog,
  ) { }


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

  obtienePedidos() {
    console.log('obtiene pedidos');
    this.calendarioService.getPedidosCalendario(this.fechaInicio, this.fechaFin);

  }

  excel() {
    this.gridApi.exportDataAsCsv();
    //this.gridApi.exportDataAsExcel({});
  }

  actualizar(){
    this.calendarioService.updatePedidosCalendario(this.rowData)
  }

}
