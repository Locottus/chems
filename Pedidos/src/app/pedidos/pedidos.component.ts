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
import { CalendarioService } from '../servicios/calendario.service';
import { Usuario } from '../interfaces/Usuario';
import { ClientesService } from '../servicios/clientes.service';
import { Cliente } from '../interfaces/Cliente';

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
  selectedValue:string;

  gridApi!: GridApi;
  gridColumnApi!: any;

  //grid settings
  gridWidth: string = "100%";
  gridHeight: string = "600px";
  public groupDisplayType: RowGroupingDisplayType = 'groupRows';

  detallePedido: DetallePedido = new DetallePedido();

  columnDefs: ColDef[] = [
    { field: 'id', hide: false, maxWidth: 100, },
    { field: 'nombre', hide: false, editable: true, },
    { field: 'cantidad', hide: false, editable: true, },
    { field: 'precio', hide: false, editable: true, },
    { field: 'empresa', hide: false, editable: true, },
    { field: 'presentacion', hide: false, editable: true, },
  ];

  //default settings for all columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };

  rowData: Array<Catalogo> = [];
  isAdmin:boolean = false;

  usuario: Usuario = new Usuario();
  dataUsuario$ = this.servicio.subjectObservableUsuario$.subscribe(async (usrData)=>{
    this.usuario = usrData;
    this.isAdmin = (this.usuario.rol == 1? true : false)
    //console.log(this.usuario);
  })

  dataCatalogo$ = this.catalogoService.subjectObservableCatalogo$.subscribe(async (data) => {
    this.rowData = data;
  })

  clientes:any;

  constructor(
    private matDialog: MatDialog,
    private servicio: ServiciosService,
    private pedidosService: PedidosService,
    private catalogoService: CatalogoService,
    private route: ActivatedRoute,
    private calendarioService:CalendarioService,
    private clientesService:ClientesService
  ) { }

  async ngOnInit() {
    this.getCatalog();
    this.route.queryParams
      .subscribe(params => {
        this.detallePedido.recordatorio = this.detallePedido.date = params["fecha"];
      });
      this.detallePedido.hora  = this.calendarioService.getCurrentHour();
  }

  async getCatalog() {
    this.catalogoService.getCatalogo();
    (await this.clientesService.obtieneClientes()).subscribe(data =>{this.clientes = data; }); 
  }

  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }


  onSubmit() {

    for(let i = 0; i < this.clientes.length; i ++){
      if (this.clientes[i].id == parseInt(this.selectedValue)){
        this.detallePedido.nombre = this.clientes[i].nombre;
        this.detallePedido.ubicacion = this.clientes[i].ubicacion;
        this.detallePedido.telefono = this.clientes[i].telefono;
        //this.detallePedido.id = this.clientes[i].id;
        break;
      }
    }
    let msg: string = `\nNombre: ${this.detallePedido.nombre}\nTelefono: ${this.detallePedido.telefono}\nUbicacion: ${this.detallePedido.ubicacion}\n`;
    let detalle: string = "";
    let detalleJson: Array<any> = [];
    let total: number = 0;
    for (let i = 0; i < this.rowData.length; i++) {
      if (this.rowData[i].cantidad > 0) {

        total = this.rowData[i].cantidad * this.rowData[i].precio + total;
        let subtotal = this.rowData[i].cantidad * this.rowData[i].precio;

        detalleJson.push({
          Producto: this.rowData[i].nombre,
          Presentacion: this.rowData[i].presentacion,
          Cantidad: this.rowData[i].cantidad,
          Subtotal: subtotal
        });

        detalle = `Producto: ${this.rowData[i].nombre} Presentacion: ${this.rowData[i].presentacion} Cantidad: ${this.rowData[i].cantidad} SubTotal: ${subtotal} \n` + detalle;

      }
    }
    detalle = msg + `\nNota:${this.detallePedido.nota}\n${detalle}\n${this.detallePedido.date}\n${this.detallePedido.hora}\nTOTAL: ${total}\n`;
    this.detallePedido.detalle = detalle;
    this.detallePedido.detalleJson = detalleJson;
    this.detallePedido.total = total;

    this.pedidosService.guardaPedido(this.detallePedido);
    
    this.reset();
    //console.log(this.detallePedido);

  }

  /*  onLogout() {
      //this.autenticado = false;
      this.reset();
      this.servicio.openDialog();
    }
  */
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
    this.detallePedido.nombre = "";
    this.detallePedido.telefono = "";
    this.detallePedido.detalle = "";
    this.detallePedido.detalleJson = [];
    this.detallePedido.ubicacion = "";
    this.detallePedido.total = 0;
    this.detallePedido.title = "";
    this.myInputField.nativeElement.focus();
  }

  agregarProducto() {
    //TODO
    //this.catalogoService.insertaCatalogo(this.rowData);
  }

  Actualizar() {
    this.catalogoService.actualizaCatalogo(this.rowData);
    //alert('Actualizado');

  }

  selected(cliente:Cliente){
    console.log(cliente);
    this.detallePedido.nombre = cliente.nombre;
    this.detallePedido.ubicacion = cliente.ubicacion;
    this.detallePedido.telefono = cliente.telefono;
  }

  changeClient(event:any){
    console.log(event);
  }
}
