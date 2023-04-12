import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
    this.httpClient.post<Usuario>(`${Constantes.backend}usuarios`, usuario)
      .subscribe(data => {
        alert(data);
      },err=>{
        alert(err.message);
      })
  }

  obtieneUsuarios() {
    this.httpClient.get<Array<Usuario>>(`${Constantes.backend}usuarios`)
      .subscribe(data => {
        //alert(data);
        this.behaviorSubjectUsuarios.next(data);
      },err=>{
        alert(err.message);
      })
  }


  actualizaUsuarios(usuarios: Array<Usuario>) {
    this.httpClient.put<Usuario>(`${Constantes.backend}usuarios`, usuarios)
      .subscribe(data => {
        alert(data);
      },err=>{
        alert(err.message);
      })
  }

}
