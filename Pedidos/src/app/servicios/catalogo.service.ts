import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Catalogo } from '../interfaces/Catalogo';
import { Constantes } from '../interfaces/Constantes';


@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  cat: Array<Catalogo> = [];

  private behaviorSubjectCatalogo = new BehaviorSubject<Array<Catalogo>>(this.cat);
  subjectObservableCatalogo$ = this.behaviorSubjectCatalogo.asObservable();

  constructor(
    private httpClient: HttpClient,

  ) { }

  catalogEmitter(c: Array<Catalogo>) {
    this.cat = c;
    this.behaviorSubjectCatalogo.next(this.cat);
  }

  getCatalogo() {
    this.httpClient.get<Array<Catalogo>>(`${Constantes.backend}catalogo`).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        //Handle the error here
        alert(err.message);
        return throwError(err);    //Rethrow it back to component
      })
    )
      .subscribe(data => {
        this.cat = data;
        this.cat.forEach(e => { e.cantidad = 0; })
        this.catalogEmitter(this.cat);
      })
  }

  actualizaCatalogo(catalogo: Array<Catalogo>) {
    this.httpClient.put(`${Constantes.backend}catalogo`, catalogo).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        //Handle the error here
        alert(err.message);
        return throwError(err);    //Rethrow it back to component
      })
    ).subscribe(data => {
      alert(data);
    });
  }

  insertaCatalogo(catalogo: Catalogo) {
    this.httpClient.post(`${Constantes.backend}catalogo`, catalogo).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        //Handle the error here
        alert(err.message);
        return throwError(err);    //Rethrow it back to component
      })
    ).subscribe(data => {
      alert(data);
    });
  }


}
