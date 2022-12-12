import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent, RowGroupingDisplayType } from 'ag-grid-community';
import { Usuario } from '../interfaces/Usuario';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { ServiciosService } from '../servicios/servicios.service';
import { UsuariosService } from '../servicios/usuarios.service';
import { NuevoUsuarioComponent } from './componentes/nuevo-usuario/nuevo-usuario.component';

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

  isCreation: boolean = false;
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
    public matDialog: MatDialog,
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

  actualizar() {
    this.usuariosService.actualizaUsuario(this.rowData);
  }

  reiniciar() {
    this.usuariosService.obtieneUsuarios();
  }

  callback(){

  }
  
  openDialog() {
    this.isCreation = true;
    this.matDialog.open(NuevoUsuarioComponent,
      {
        disableClose: true,
        data: {
          isCreation: true
        }
      }).afterClosed().subscribe(()=>{
        this.reiniciar();
      });
  }

  finishedCreation(event: any) {
    this.isCreation = event;
  }
}
