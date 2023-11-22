import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  BehaviorSubject,
  Observable,
  catchError,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';
import { Constantes } from '../interfaces/Constantes';
import { Usuario } from '../interfaces/Usuario';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  private behaviorSubject = new BehaviorSubject<boolean>(false);
  subjectObservable$ = this.behaviorSubject.asObservable();

  usuario: Usuario = new Usuario();
  private behaviorSubjectUsuario = new BehaviorSubject<Usuario>(this.usuario);
  subjectObservableUsuario$ = this.behaviorSubjectUsuario.asObservable();
  private loginKey = 'loginFlagChems';

  constructor(private httpClient: HttpClient, private matDialog: MatDialog) {
    //this.getJSON();
  }

  loginStatus(success: boolean) {
    this.behaviorSubject.next(success);
  }

  async login(usuario: string, clave: string) {
    this.httpClient
      .post<any>(`${Constantes.backend}login`, {
        usuario: usuario,
        clave: clave,
      })
      .pipe(
        catchError((err) => {
          console.log('error caught in service');
          console.error(err);
          //Handle the error here
          alert(err.message);
          return throwError(() => err);
        })
      )
      .subscribe((data) => {
        this.usuario = data[0];
        this.behaviorSubjectUsuario.next(this.usuario);
        this.loginStatus(data.length > 0 && data[0].activo == 1 ? true : false);
        //console.log(data);
      });
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

  CheckPassword(pwd: string) {
    //https://www.w3resource.com/javascript/form/password-validation.php
    let exp: RegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (exp.test(pwd)) {
      console.log(pwd, ' OK');
      return true;
    } else {
      //this.showError('El Password debe ser de 8 a 15 posiciones, debe tener mayusculas y minusculas, numeros y al menos 1 caracter especial')
      console.log(pwd, ' ERROR');
      return false;
    }
  }

  LoginPageFlag() {
    //const hasReloaded = sessionStorage.getItem(this.loginKey);
    sessionStorage.setItem(this.loginKey, 'true');
  }

  resetLoginFlag() {
    sessionStorage.removeItem(this.loginKey);
    const hasReloaded = sessionStorage.getItem(this.loginKey);
    sessionStorage.setItem(this.loginKey, 'false');
  }

  removeLoginFlag() {
    sessionStorage.removeItem(this.loginKey);
  }

  getLoginFlag() {
    return sessionStorage.getItem(this.loginKey);
  }
}
