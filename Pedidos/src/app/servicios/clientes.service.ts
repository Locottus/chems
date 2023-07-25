import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constantes } from '../interfaces/Constantes';
import { Cliente } from '../interfaces/Cliente';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  async obtieneClientes() {
    return this.httpClient.get(`${Constantes.backend}clientes`).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        //Handle the error here
        alert(err.message);
        return throwError(() => err);
      })
    )

  }

  salvaClientes(cliente: Cliente) {
    return this.httpClient.post(`${Constantes.backend}clientes`, cliente).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        //Handle the error here
        alert(err.message);
        return throwError(() => err);
      })
    )
      .subscribe(data => {
        //console.log(data);
        alert(data);
      });
  }

  actualizaClientes(clientes: Array<Cliente>) {
    return this.httpClient.put(`${Constantes.backend}clientes`, clientes).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        //Handle the error here
        alert(err.message);
        return throwError(() => err);
      })
    )
      .subscribe(data => {
        //console.log(data);
        alert(data);
      });

  }

}
