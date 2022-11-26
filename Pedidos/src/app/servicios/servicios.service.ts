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

   async login(usuario:string, clave:string) {
    //return  this.http.post<any>("http://localhost:3000/api/login", {usuario, clave});
    return (await this.httpClient.post("http://localhost:3000/api/login",{
      usuario: usuario,
      clave: clave
    }));

}



  logout() {
    this.behaviorSubject.next(false);
  }

}
