import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { Constantes } from '../interfaces/Constantes';
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
    private matDialog: MatDialog,
  ) {
    //this.getJSON();
  }

  loginStatus(success: boolean) {
    this.behaviorSubject.next(success);
  }

  async login(usuario: string, clave: string) {
    this.httpClient.post<any>(`${Constantes.backend}login`, {
      usuario: usuario,
      clave: clave
    }).subscribe(data => {
      this.loginStatus((data.length > 0 && data[0].activo == 1 ? true : false));
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
