import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { Usuario } from '../interfaces/Usuario';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {


  private behaviorSubject = new BehaviorSubject<boolean>(false);
  subjectObservable$ = this.behaviorSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog
  ) {
    //this.getJSON();
  }

  loginStatus(success: boolean) {
    this.behaviorSubject.next(success);
  }

  async login(usuario: string, clave: string) {
    this.httpClient.post<any>('http://localhost:3000/api/login', {
      usuario: usuario,
      clave: clave
    }).subscribe(data => {
      this.loginStatus((data.length > 0 && data[0].activo == 1 ? true : false));
    })
  }

  async nuevoUsuario(usuario: Usuario) {
    this.httpClient.post<Usuario>('http://localhost:3000/api/usuarios', usuario)
    .subscribe(data => {

      //console.log(data);
      alert(data);
      //this.loginStatus((data.length > 0 && data[0].activo == 1 ? true : false));
    })
  }


  logout() {
    this.behaviorSubject.next(false);
  }

  openDialog() {
    this.matDialog.open(LoginModalComponent, { disableClose: true });
  }

  navegaOrigen() {
    window.location.href = '/';
  }
}
