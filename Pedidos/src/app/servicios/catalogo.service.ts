import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
    this.httpClient.get<Array<Catalogo>>(`${Constantes.backend}catalogo`)
      .subscribe(data => {
        this.cat = data;
        this.cat.forEach(e => { e.cantidad = 0; })
        this.catalogEmitter(this.cat);
      },err=>{
        alert(err.message);
      })
  }

  actualizaCatalogo(catalogo: Array<Catalogo>) {
    this.httpClient.put(`${Constantes.backend}catalogo`, catalogo).subscribe(data => {
      alert(data);
    },err=>{
      alert(err.message);
    });
  }

  insertaCatalogo(catalogo: Catalogo) {
    this.httpClient.post(`${Constantes.backend}catalogo`, catalogo).subscribe(data => {
      alert(data);
    },err=>{
      alert(err.message);
    });
  }


}
