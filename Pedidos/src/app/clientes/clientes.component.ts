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
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../interfaces/Usuario';
import { Cliente } from '../interfaces/Cliente';
import { ClientesService } from '../servicios/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  @ViewChild("myInputFocus") myInputField: ElementRef;
  @ViewChild('topGrid') agGrid!: AgGridAngular;

  catalogo: Array<Catalogo> = [];


  gridApi!: GridApi;
  gridColumnApi!: any;

  //grid settings
  gridWidth: string = "100%";
  gridHeight: string = "600px";
  public groupDisplayType: RowGroupingDisplayType = 'groupRows';

  nuevoCliente: Cliente = new Cliente();

  columnDefs: ColDef[] = [
    { field: 'id', hide: false, maxWidth: 100, },
    { field: 'nombre', hide: false, editable: true, },
    { field: 'telefono', hide: false, editable: true, },
    { field: 'ubicacion', hide: false, editable: true, },
    { field: 'email', hide: false, editable: true, },
  ];

  //default settings for all columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };

  rowData: any;//Array<Cliente> = [];
  isAdmin: boolean = false;

  usuario: Usuario = new Usuario();
  dataUsuario$ = this.servicio.subjectObservableUsuario$.subscribe(async (usrData) => {
    this.usuario = usrData;
    this.isAdmin = (this.usuario.rol == 1 ? true : false)
    //console.log(this.usuario);
  })

  constructor(
    private matDialog: MatDialog,
    private servicio: ServiciosService,
    private pedidosService: PedidosService,
    private clientesService: ClientesService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    await this.getCatalog();
  }

  async getCatalog() {
    (await this.clientesService.obtieneClientes()).subscribe(data => { this.rowData = data; });
  }

  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }


  onSubmit() {
    this.reset();
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
    this.nuevoCliente.nombre = "";
    this.nuevoCliente.telefono = "";
    this.nuevoCliente.ubicacion = "";
    this.nuevoCliente.email = "";
    this.nuevoCliente.id = 0;
    this.myInputField.nativeElement.focus();
  }

  AgregarCliente() {
    console.log(this.nuevoCliente);
    this.clientesService.salvaClientes(this.nuevoCliente);
  }

  Actualizar() {
    //alert('Actualizado');
    this.clientesService.salvaClientes(this.rowData);
  }

}
