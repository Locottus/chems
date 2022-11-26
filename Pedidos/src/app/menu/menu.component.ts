import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios/servicios.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  autenticado: boolean = false;
  /**
  * observable to refresh the data when the modal updates.
  */
  dataChange$ = this.servicio.subjectObservable$.subscribe(async (loginStatus) => {
    this.autenticado = loginStatus;
  });

  constructor( 
    private servicio: ServiciosService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  //https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/
  navegacion(ruta:string){
    switch (ruta){
      case 'calendario':
        this.router.navigateByUrl('/calendario')
        break;
      case 'pedidos':
        this.router.navigateByUrl('/pedidos')
        break;

    }
    
  }

}
