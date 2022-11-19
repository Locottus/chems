import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import catalogo from '../assets/catalogo/catalog.json'
import credentials from '../assets/credentials/credentials.json'

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {


  private behaviorSubject = new BehaviorSubject<boolean>(false);
  subjectObservable$ = this.behaviorSubject.asObservable();

  constructor(
  ) {
    //this.getJSON();
  }

  public getCatalogo() {
    //console.log(catalogo);
    return catalogo;
    //this.http.get(this.URL).subscribe(console.log);
  }

  public getCredentials() {
    return credentials;
  }

  loginStatus(success: boolean) {
    this.behaviorSubject.next(success);
  }
}
