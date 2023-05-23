import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Constantes } from '../interfaces/Constantes';
import { Usuario } from '../interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios: Array<Usuario> = [];

  private behaviorSubjectUsuarios = new BehaviorSubject<Array<Usuario>>(this.usuarios);
  subjectObservableUsuarios$ = this.behaviorSubjectUsuarios.asObservable();

  constructor(
    private httpClient: HttpClient,
  ) { }


  nuevoUsuario(usuario: Usuario) {
    this.httpClient.post<Usuario>(`${Constantes.backend}usuarios`, usuario).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error caught in service')
        console.error(error);
        //Handle the error here
        alert(error.message);
        return throwError(() => error);    //Rethrow it back to component
      })
    ).subscribe(data => {
      alert(data);
    })
  }

  obtieneUsuarios() {
    this.httpClient.get<Array<Usuario>>(`${Constantes.backend}usuarios`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error caught in service')
        console.error(error);

        //Handle the error here
        alert(error.message);
        return throwError(() => error);    //Rethrow it back to component
      })
    ).subscribe(data => {
      //alert(data);
      this.behaviorSubjectUsuarios.next(data);
    })
  }


  actualizaUsuarios(usuarios: Array<Usuario>) {
    this.httpClient.put<Usuario>(`${Constantes.backend}usuarios`, usuarios).pipe(
      catchError((error: HttpErrorResponse) => {
        console.warn(
          'the interceptor has caught an error, process it here',
          error
        );
        alert(error.message);
        return throwError(() => error);
      }
      )).subscribe(data => {
        alert(data);
      })
  }

}
