import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {


  private behaviorSubject = new BehaviorSubject<boolean>(false);
  subjectObservable$ = this.behaviorSubject.asObservable();

  constructor(
    private httpClient: HttpClient
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
      console.log(data[0].count);
      this.loginStatus((data[0].count > 0 ? true : false));
    })
  }

  logout() {
    this.behaviorSubject.next(false);
  }

}
