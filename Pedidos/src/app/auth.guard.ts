import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiciosService } from './servicios/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  autenticado: boolean = false;

  dataLogin$ = this.servicio.subjectObservable$.subscribe(async (loginStatus) => {
    this.autenticado = loginStatus;
    if (!this.autenticado){
      this.servicio.navegaOrigen();
    }

  });

  constructor(
    private servicio: ServiciosService,

  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.autenticado;
  }
  
}
