import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent, RowGroupingDisplayType } from 'ag-grid-community';
import { DetallePedido } from 'src/app/interfaces/DetallePedido';
import { CalendarioService } from 'src/app/servicios/calendario.service';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer
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
    this.calendarioService.getPedidosCalendario(this.fechaInicio, this.fechaFin);
  }

  excel() {
    this.gridApi.exportDataAsCsv();
    //this.gridApi.exportDataAsExcel({});
  }

  actualizar(){
    this.calendarioService.updatePedidosCalendario(this.rowData)
  }

  csv(){
    let datos : Array<any> = [];
    for (let i = 0; i < this.rowData.length ; i++){
      let detalles = this.rowData[i].detallejson.toString().length > 0 ||  this.rowData[i].detallejson != undefined  ? JSON.parse(this.rowData[i].detallejson.toString()) : [{}];
      //console.log(detalles);
      let dato : DetallePedido = new DetallePedido();
      dato.date = this.rowData[i].date;
      dato.detalleJson = detalles;
      dato.detallejson = detalles;
      dato.estado = this.rowData[i].estado;
      dato.hora = this.rowData[i].hora;
      dato.nombre = this.rowData[i].nombre;
      dato.nota = this.rowData[i].nota;
      dato.recordatorio = this.rowData[i].recordatorio;
      dato.telefono = this.rowData[i].telefono;
      dato.title = this.rowData[i].title;
      dato.total = this.rowData[i].total;
      console.log(dato);
      datos.push(dato);
    }
    console.log('********************')
    console.log(datos);
    this.saveFile(datos);
  }

  fileUrl: any;
  fileReady: boolean = false;

  saveFile(lista: Array<any>) {
    let fix: any = "REPORTE DE PEDIDOS\n";
    lista.forEach(e => {
      if (e.length > 0) {
        fix = fix + e + '\n';
        if (e.detallejson.length > 0){
          for (let f = 0; f < e.detallejson.length; f++){
            
          }
          
        }
      }
    });
    const data: any = fix;
    const blob = new Blob([data], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

  }

}
