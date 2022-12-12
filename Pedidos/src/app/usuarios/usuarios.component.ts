import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent, RowGroupingDisplayType } from 'ag-grid-community';
import { Usuario } from '../interfaces/Usuario';
import { ServiciosService } from '../servicios/servicios.service';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  @ViewChild("myInputFocus") myInputField: ElementRef;
  @ViewChild('topGrid') agGrid!: AgGridAngular;

  gridApi!: GridApi;
  gridColumnApi!: any;

  //grid settings
  gridWidth: string = "100%";
  gridHeight: string = "600px";
  public groupDisplayType: RowGroupingDisplayType = 'groupRows';

  columnDefs: ColDef[] = [
    { field: 'usuario', hide: false, editable: false, },
    { field: 'nombre', hide: false, editable: true },
    { field: 'rol', hide: false, editable: true },
    { field: 'activo', hide: false, editable: true, },
    { field: 'clave', hide: false, editable: true, },
  ];

  //default settings for all columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };


  dataCatalogo$ = this.usuariosService.subjectObservableUsuarios$.subscribe(async (data) => {
    this.rowData = data;
  })

  rowData: Array<Usuario> = [];

  constructor(
    private servicio: ServiciosService,
    private usuariosService: UsuariosService,
  ) { }

  ngOnInit() {
    //throw new Error('Method not implemented.');
    this.usuariosService.obtieneUsuarios();
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

  Actualizar(){
    this.usuariosService.actualizaUsuario(this.rowData);
  }

  Reiniciar(){
    this.usuariosService.obtieneUsuarios();
  }
}
